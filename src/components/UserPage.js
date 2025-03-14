import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UserPage() {
  const { email } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [email]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500 mt-8">Error: {error}</p>;
  if (!userData.email)
    return <p className="text-center mt-8">User not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-8 flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg border border-gray-300 p-6 rounded-lg">
        {/* Header */}
        <div className="bg-blue-700 text-white p-6 mb-6 rounded-t-lg">
          <h2 className="text-3xl font-bold text-left">User Profile</h2>
          <p className="mt-2 text-left">{userData.email}</p>
        </div>

        {/* User Details */}
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
            {
              title: "Additional Details",
              fields: [
                "bank_account",
                "nominee_details",
                "photograph",
                "signature",
              ],
            },
          ].map((section, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-2xl font-semibold mb-3">{section.title}</h3>
              <hr className="border-gray-300 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.fields.map((field, i) => (
                  <div key={i} className="ml-6">
                    <p className="text-gray-700 font-medium">
                      {field
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                      :
                    </p>
                    <div className="border p-2 rounded-md bg-gray-50 text-gray-900">
                      {userData[field] || "N/A"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Edit Profile Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/user-profile")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
