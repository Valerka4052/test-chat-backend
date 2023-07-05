const jwt = require('jsonwebtoken')
// const User = require('../models/User');
require('dotenv').config();
const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
    try {
        console.log('req.headers.authorization',req.headers.authorization);
        if (!req.headers.authorization) return res.status(401).json('Forbidden!');
        const token = req.headers.authorization.split(' ')[1];  
        const payload = await jwt.verify(token, SECRET_KEY);
        console.log('payload', payload);
        if (!payload) return res.status(401).json('invalid token');
        // const user = await User.findById(payload.id);
        // if (!user) throw new Error('Not authorized');
        // req.user = user;
        req.payload = payload;
        next();
    } catch (error) {
       console.log(error.message); 
    };
}
module.exports = { auth };