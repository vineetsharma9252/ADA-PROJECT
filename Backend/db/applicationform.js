const mongoose = require("mongoose");

// Family Member Schema
const FamilyMemberSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  dob: String,
});

// Main Application Schema
const ApplicationSchema = new mongoose.Schema(
  {
    firstName: String,
    middleName: String,
    lastName: String,
    email: String,
    incomeGroup: String,
    category: String,
    paymentAmount: String,

    familyMembers: [FamilyMemberSchema],
    schemeID: String,
    startDate: String,
    endDate: String,
    comments: { type: String, default: "No comments available" },

    // ✅ Add applicationID field (Unique)
    applicationID: {
      type: String,
    },

    // ✅ Add status field with default value 'Pending'
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
); // ✅ Optional: Adds createdAt and updatedAt automatically

module.exports = mongoose.model("application", ApplicationSchema);
