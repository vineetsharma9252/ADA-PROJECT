import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
function UserPage() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({});
  
const location = useLocation();
const email = location.state?.email;
  


  // Fetch user data
  useEffect(() => {
   
    fetch(`http://localhost:4500/user-profile/api/data/${email}`)
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
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle Save (via form submit)
  const handleSubmit = (e) => {
    e.preventDefault();
    // API call to update
    fetch(`http://localhost:4500/user-profile-update/${email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editedData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update");
        return res.json();
      })
      .then((data) => {
        alert("Profile updated successfully!");
        setUserData(s => ({ ...s, ...editedData }));
        setEditMode(false);
      })
      .catch((err) => alert("Error updating profile: " + err.message));
  };

  // Handle Cancel
  const handleCancel = () => {
    setEditedData(userData);
    setEditMode(false);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#4caf50" size={50} /> {/* Spinner */}
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
                  "fullName",
                  "gender",
                  "dob",
                  "father_name",
                  "marital_status",
                  "caste",
                  "disability",
                ],
              },
              {
                title: "Contact Details",
                fields: ["email", "phone", "curr_address", "perm_address"],
              },
              {
                title: "Identity Proofs",
                fields: ["aadharCard", "panCard", "voterId"],
              },
              {
                title: "Occupation & Income",
                fields: ["occupation", "income", "education"],
              },
            ].map((section, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-2xl font-semibold mb-3">{section.title}</h3>
                <hr className="border-gray-700 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {section.fields.map((field, i) => (
                    <div key={i} className="ml-6">
                      <p className="text-gray-700 font-medium">
                        {field
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                        :
                      </p>
                      {editMode ? (
                        <input
                          type="text"
                          value={editedData[field] || ""}
                          onChange={(e) => handleChange(field, e.target.value)}
                          className="border p-2 rounded-md bg-white text-gray-900 w-full"
                          required // <-- Required attribute added
                        />
                      ) : (
                        <div className="border p-2 rounded-md bg-gray-50 text-gray-900 uppercase">
                          {userData[field]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div>
            {editMode ? (
              <>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
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
              className="block custom-btn btn btn-light text-decoration-none schemes-apply-button mt-3"
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
