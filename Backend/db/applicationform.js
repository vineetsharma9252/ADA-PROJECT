const mongoose = require('mongoose');

const FamilyMemberSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  aadhar: String,
});

const ApplicationSchema = new mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  incomeGroup: String,
  plot: String,
  category: String,
  paymentAmount: Number,
  familyMembers: [FamilyMemberSchema],
});

module.exports = mongoose.model('Application', ApplicationSchema);
