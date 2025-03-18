const mongoose = require("mongoose");
// Replace with a strong, securely stored key

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  gender: { type: String },
  father_name: { type: String },
  dob: { type: String },
  email: { type: String, lowercase: true, required: true },
  password: { type: String }, // Hashed password using bcrypt
  phone: { type: String, required: true },
  marital_status: { type: String }, // ✅ CHANGED FROM Boolean to String
  caste: { type: String },
  curr_address: { type: String },
  perm_address: { type: String },
  aadharCard: { type: String, required: true },
  panCard: { type: String },
  voterId: { type: String },
  occupation: { type: String },
  income: { type: String },
  education: { type: String },
  disability: { type: String }, // Typo fixed: disability

  resetToken: { type: String }, // 🔑 for password reset
  resetTokenExpiration: { type: Date }, // ⏰ expiration time
},
{ timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
