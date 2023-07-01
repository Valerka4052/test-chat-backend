const { Schema, model } = require('mongoose');
const messageSchema = new Schema({
    chatroom: { type: Schema.Types.ObjectId, required: 'chatroom required', ref: 'Chatroom' },
    user: { type: Schema.Types.ObjectId, required: 'user required', ref: 'User' },
    message: { type: String, required: 'message is required' }
}, { timestamps: true, versionKey: false });
const Message = model('Message', messageSchema);
module.exports = Message;
