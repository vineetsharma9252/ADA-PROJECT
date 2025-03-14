const mongoose = require('mongoose');

// Family Member Schema
const FamilyMemberSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  aadhar: String,
});

// Main Application Schema
const ApplicationSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  incomeGroup: String,
  plot: String,
  category: String,
  familyMembers: [FamilyMemberSchema],
  
  // ✅ Add applicationID field (Unique)
  applicationID: {
    type: String,
    unique: true,
    required: true
  },
  
  // ✅ Add status field with default value 'Pending'
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  }

}, { timestamps: true }); // ✅ Optional: Adds createdAt and updatedAt automatically

module.exports = mongoose.model('application', ApplicationSchema);
