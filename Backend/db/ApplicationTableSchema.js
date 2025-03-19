const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: String, required: true }, 
  endDate: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  comments: { type: String, default: "" }, // ✅ Ensure comments field exists
  applicationID: {
    type: String,  // Random unique ID generate kar sakte ho
    unique: true
  }
}, { timestamps: true, collection: 'ApplicationTable' });  // 👈 Collection will be named 'application'

module.exports = mongoose.model('ApplicationTable', ApplicationSchema);  // 👈 Model name is 'ApplicationTable'
