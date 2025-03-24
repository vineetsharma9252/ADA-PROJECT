import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Preview = ({ formData, familyMembers, onEdit, onSubmit, schemeName }) => {
  const navigate = useNavigate();

  const handleFinalSubmit = async () => {
    try {
      // Call the onSubmit function passed from the parent component
      await onSubmit();

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Application Submitted!",
        text: "Your application has been submitted successfully.",
      });

      // Navigate to the dashboard
      navigate("/dashboard", { state: { email: formData.email } });
    } catch (error) {
      console.error("Error during submission:", error);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "An error occurred while submitting the application. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full h-20 appHeading text-center bg-gray-200 py-4 shadow-md">
        <h2 className="relative inline-block w-[40%] text-center mt-5 py-2 mb-5 text-black text-2xl font-bold after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[oklch(0.627_0.194_149.214)] after:transition-all after:duration-500 hover:after:w-full">
          Preview Application for {schemeName}
        </h2>
      </div>

      <div className="application-form-border px-8 pt-6 pb-8 mb-4 mt-5 w-full max-w-[95%] mobile-mt bg-white rounded-lg shadow-md">
        {/* Personal Details Section */}
        <h3 className="text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-4">
          Personal Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-700 text-left">
              <strong>First Name:</strong> {formData.firstName}
            </p>
          </div>
          <div>
            <p className="text-gray-700 text-left">
              <strong>Middle Name:</strong> {formData.middleName}
            </p>
          </div>
          <div>
            <p className="text-gray-700 text-left">
              <strong>Last Name:</strong> {formData.lastName}
            </p>
          </div>
          <div>
            <p className="text-gray-700 text-left">
              <strong>Email:</strong> {formData.email}
            </p>
          </div>
          <div>
            <p className="text-gray-700 text-left">
              <strong>Income Group:</strong> {formData.incomeGroup}
            </p>
          </div>
          <div>
            <p className="text-gray-700 text-left">
              <strong>Category:</strong> {formData.category}
            </p>
          </div>
          <div>
            <p className="text-gray-700 text-left">
              <strong>No. of Dependent Family Members:</strong>{" "}
              {formData.noOfDependentFamilyMembers}
            </p>
          </div>
        </div>

        {/* Family Members Section */}
        <h3 className="text-left uppercase tracking-wide text-gray-700 text-xs font-bold mb-4">
          Dependent Family Members
        </h3>
        {familyMembers.length > 0 ? (
          <div className="space-y-4">
            {familyMembers.map((member, index) => (
              <div
                key={index}
                className="p-4 border border-gray-300 rounded-lg bg-gray-50"
              >
                <p className="text-gray-700">
                  <strong>Name:</strong> {member.name}
                </p>
                <p className="text-gray-700">
                  <strong>Mobile:</strong> {member.mobile}
                </p>
                <p className="text-gray-700">
                  <strong>Aadhar:</strong> {member.aadhar}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No family members added.</p>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={onEdit}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Edit Application
          </button>
          <button
            onClick={handleFinalSubmit}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
