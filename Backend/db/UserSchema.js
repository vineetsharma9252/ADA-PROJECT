const mongoose = require("mongoose");
// Replace with a strong, securely stored key

// Define Mongoose Schema
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String },
    gender: { type: String },
    father_name: { type: String },
    dob: { type: String },
    email: { type: String, unique: true, lowercase: true },
    password: { type: String }, // Hashed password using bcrypt
    phone: { type: String },
    marital_status: { type: Boolean },
    caste: { type: String },
    curr_address: { type: String },
    perm_address: { type: String },
    aadharCard: { type: String },
    panCard: { type: String },
    voterId: { type: String },
    occupation: { type: String },
    income: { type: String },
    education: { type: String },
    disablity: { type: String },
  } // Enables decryption on retrieval
);

module.exports = mongoose.model("User", userSchema);
