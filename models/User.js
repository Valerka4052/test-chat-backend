const { Schema, model } = require('mongoose');
const userSchema = new Schema({
    name: { type: String, required: 'name is required' },
    email: { type: String, required: 'email is required' },
    password: { type: String, required: 'password is required' }
},
    { timestamps: true, versionKey: false });
const User = model('User', userSchema);
module.exports = User;
