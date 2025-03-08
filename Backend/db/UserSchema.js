const mongoose = require('mongoose');

//Define the schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hash: { type: String, required: true }, // Ensure this field exists
  });

//model creation
module.exports = mongoose.model('users', userSchema);
  