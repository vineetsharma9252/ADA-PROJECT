const mongoose = require('mongoose');

const PasswordResetTokenSchema = new mongoose.Schema({
    email: { type: String, required: true },
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model('PasswordResetToken', PasswordResetTokenSchema);
