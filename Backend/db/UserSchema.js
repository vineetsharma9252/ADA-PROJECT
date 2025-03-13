const mongoose = require("mongoose");
// Replace with a strong, securely stored key

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    gender: { type: String },
    father_name: { type: String },
    dob: { type: String },
    email: { type: String, unique: true, lowercase: true },
    password: { type: String }, // Hashed password using bcrypt
    phone: { type: String },
    marital_status: { type: String }, // ✅ CHANGED FROM Boolean to String
    caste: { type: String },
    curr_address: { type: String },
    perm_address: { type: String },
    aadharCard: { type: String },
    panCard: { type: String },
    voterId: { type: String },
    occupation: { type: String },
    income: { type: String },
    education: { type: String },
    disability : { type: String }, // Typo fix recommended: disability
  }
);


module.exports = mongoose.model("users", userSchema);
