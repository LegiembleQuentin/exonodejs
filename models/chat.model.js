const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Chat', ChatSchema);
