import { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

function UserPage() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    fetch(`http://localhost:4500/user-profile/api/data/${email}`, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("User not found");
        }
        return response.json();
      })
      .then((data) => {
        setUserData(data);
        setEditedData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [email]);

  // Handle Input Change
  const handleChange = (field, value) => {
    if (field === "email" || field === "phone") {
      return;
    }
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle Save (via form submit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create a copy of edited data
      const dataToSave = {...editedData};

      // API call to update
      const response = await fetch(`http://localhost:4500/user-profile-update/${email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSave),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to update");
      
      const data = await response.json();
      alert("Profile updated successfully! Redirecting to login...");
      navigate("/login");
      setUserData((s) => ({ ...s, ...dataToSave }));
      setEditMode(false);
    } catch (err) {
      alert("Error updating profile: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Cancel
  const handleCancel = () => {
    setEditedData(userData);
    setEditMode(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4caf50" size={50} />
      </div>
    );
  if (error)
    return <p className="text-center text-red-500 mt-8">Error: {error}</p>;
  if (!userData.email)
    return <p className="text-center mt-8">User not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg border border-gray-300 p-6">
        {/* Header */}
        <div className="bg-green-700 text-white p-6 mb-6 flex justify-between">
          <div>
            <h2 className="text-3xl font-bold text-left">User Profile</h2>
            <p className="mt-2 text-left">{userData.email}</p>
          </div>
        </div>

        {/* User Details Form */}
        <form onSubmit={handleSubmit}>
          <div className="p-4 text-left">
            {[
              {
                title: "Personal Details",
                fields: [
                  {
                    name: "fullName",
                    type: "text",
                    pattern: "[A-Za-z ]+",
                    title: "Letters and spaces only",
                  },
                  { 
                    name: "gender",
                    type: "select",
                    options: ["Male", "Female", "Other"]
                  },
                  { name: "dob", type: "date" },
                  {
                    name: "father_name",
                    type: "text",
                    pattern: "[A-Za-z ]+",
                    title: "Letters and spaces only",
                  },
                  {
                    name: "marital_status",
                    type: "select",
                    options: ["Married", "Unmarried"],
                  },
                  {
                    name: "caste",
                    type: "select",
                    options: ["General", "OBC", "SC", "ST", "Others"],
                  },
                  {
                    name: "disability",
                    type: "select",
                    options: ["Yes", "No"],
                  },
                ],
              },
              {
                title: "Contact Details",
                fields: [
                  { name: "email", type: "email", required: true },
                  {
                    name: "phone",
                    type: "tel",
                    pattern: "[0-9]{10}",
                    title: "10 digit phone number",
                  },
                  { name: "curr_address", type: "text" },
                  { name: "perm_address", type: "text" },
                ],
              },
              {
                title: "Occupation & Income",
                fields: [
                  { 
                    name: "occupation", 
                    type: "select",
                    options: ["Employed", "Self-Employed", "Unemployed", "Student", "Retired"]
                  },
                  { name: "income", type: "number", min: 0 },
                  {
                    name: "education", 
                    type: "select",
                    options: ["Below 10th", "10th Pass", "12th Pass", "Graduate", "Post Graduate", "Doctorate"]
                  },
                ],
              },
            ].map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-2xl font-semibold mb-3">{section.title}</h3>
                <hr className="border-gray-700 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.fields.map((field, i) => (
                    <div key={i} className="ml-6">
                      <label className="text-gray-700 font-medium">
                        {field.name
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                        :
                      </label>
                      {editMode ? (
                        field.type === "select" ? (
                          <select
                            value={editedData[field.name] || ""}
                            onChange={(e) =>
                              handleChange(field.name, e.target.value)
                            }
                            className="border p-2 rounded-md bg-white text-gray-900 w-full"
                          >
                            <option value="">
                              Select {field.name.replace(/_/g, " ")}
                            </option>
                            {field.options.map((option, idx) => (
                              <option key={idx} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type || "text"}
                            value={editedData[field.name] || ""}
                            onChange={(e) =>
                              handleChange(field.name, e.target.value)
                            }
                            className="border p-2 rounded-md bg-white text-gray-900 w-full"
                            required={field.required}
                            pattern={field.pattern}
                            title={field.title}
                            min={field.min}
                            autoComplete="on"
                            disabled={field.name === "email"}
                          />
                        )
                      ) : (
                        <div className="border p-2 rounded-md bg-gray-50 text-gray-900">
                          {userData[field.name]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            {editMode ? (
              <>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ClipLoader color="#ffffff" size={20} />
                  ) : (
                    "Save"
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
            )}
            <Link
              to="/schemes"
              className="block bg-green-600 text-white px-4 py-2 rounded text-decoration-none schemes-apply-button mt-0"
            >
              Go to schemes
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserPage;