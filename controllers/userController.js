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
        if (!user) return res.status(401).json('There is no user with such email');
        const truePassword = await bcrypt.compare(password, user.password);
        if (!truePassword) return res.status(401).json('Password is wrong!');
        const payload = { id: user._id };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "7d" });
        res.json({ ...user._doc, token });
   } catch (error) {
        console.log(error.message)

   }
}

const currentUser = async (req, res) => {
   try {
        if (!req.headers.authorization) return res.status(401).json('Forbidden!');
        const token = req.headers.authorization.split(' ')[1];  
        const payload = await jwt.verify(token, SECRET_KEY);
        // console.log('payload', payload);
        if (!payload) return res.status(401).json('invalid token');
        const user = await User.findById(payload.id);
        if (!user) throw new Error('Not authorized');
    // console.log('user',user);
      return  res.json(user);

    } catch (error) {
       console.log(error.message); 
    };
};

const updateUserImage = async (req, res) => {
    try {
        const { id, imageURL } = req.body;
        const user = await User.findById(id);
        if (!user) return res.status(401).json('There is no user with such email');
        const updatedUser = await User.findByIdAndUpdate(id, { imageURL }, { new: true });
        res.json(updatedUser);
    } catch (error) {
        console.log(error.message)
    }
};


module.exports = { register, login, currentUser, updateUserImage };