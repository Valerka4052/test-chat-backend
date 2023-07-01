const { Schema, model } = require('mongoose');
const chatroomSchema = new Schema({
    name: { type: String, required: 'name is required' },
    commetntsCount: { type: Number, default: 0 },
    // user: { type: Schema.Types.ObjectId, required: 'user required', ref: 'User' },
},
    { timestamps: true, versionKey: false });
const Chatroom = model('Chatroom', chatroomSchema);
module.exports = Chatroom;
