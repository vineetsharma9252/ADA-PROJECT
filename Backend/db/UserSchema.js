const mongoose = require("mongoose");
// Replace with a strong, securely stored key

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    gender: { type: String, required: true },
    father_name: { type: String, required: true },
    dob: { type: String, required: true },
    email: { type: String, lowercase: true, required: true },
    password: { type: String, required: true }, // Hashed password using bcrypt
    phone: { type: String, required: true },
    marital_status: { type: String, required: true }, // ✅ CHANGED FROM Boolean to String
    caste: { type: String, required: true },
    curr_address: { type: String, required: true },
    perm_address: { type: String, required: true },
    aadharCard: { type: String, required: true },
    panCard: { type: String, required: true },
    voterId: { type: String, required: true },
    occupation: { type: String, required: true },
    income: { type: String, required: true },
    education: { type: String, required: true },
    disability: { type: String, required: true } // Typo fixed: disability
  }
  
);


module.exports = mongoose.model("users", userSchema);
