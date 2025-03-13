import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserPage() {
  const { email } = useParams();
  const [userData, setUserData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    father_name: "",
    perm_address: "",
    curr_address: "",
    phone: "",
    email: "",
    aadharCard: "",
    panCard: "",
    voterId: "",
    occupation: "",
    income: "",
    education: "",
    caste: "",
    disability: "",
    marital_status: "",
    bank_account: "",
    nominee_details: "",
    photograph: "",
    signature: "",
  });
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!userData.email) return <p>User not found</p>;

  return (
    <div>
      <div
        className="container text-center p-2 mt-2 w-full"
        style={{ backgroundColor: "green" }}
      >
        <h2>User Profile</h2>
        <p>
          <strong>Name:</strong> {userData.fullName}
        </p>
        <p>
          <strong>Gender:</strong> {userData.gender}
        </p>
        <p>
          <strong>Date of Birth:</strong> {userData.dob}
        </p>
        {/* Add other fields similarly */}
      </div>
    </div>
  );
}

export default UserPage;
