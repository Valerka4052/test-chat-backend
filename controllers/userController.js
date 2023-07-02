const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) throw new Error('User is already exist');
        const hashedPassword = await bcrypt.hash(password, 7);
        const newUser = await User.create({ name, email, password: hashedPassword });
        res.json(newUser);
   } catch (error) {
    console.log(error.message)
   } 
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) res.json('There is no user with such email');
        const truePassword = await bcrypt.compare(password, user.password);
        if (!truePassword) res.json('Password is wrong!');
        const payload = { id: user._id };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });
        res.json({ ...user._doc, token });
   } catch (error) {
        console.log(error.message)

   }
}

// const logout = async (req, res) => {
//     try {
    
//     } catch (error) {
    
//     }
// };


module.exports = { register, login};