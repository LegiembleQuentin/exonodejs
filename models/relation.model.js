const mongoose = require('mongoose');

const RelationSchema = new mongoose.Schema({
    user1: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    user2: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'blocked'], default: 'pending' },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Relation', RelationSchema);
