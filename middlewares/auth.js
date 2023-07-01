const jwt = require('jsonwebtoken')
const User = require('../models/User')
const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) res.status(401).json('Forbidden!');
        const token = req.headers.authorization.split(' ')[1];  
        const payload = await jwt.verify(token, 'lhvklhb');
        if (!payload) res.json('Not authorized');
        // const user = await User.findById(payload.id);
        // if (!user) throw new Error('Not authorized');
        // req.user = user;
        req.payload = payload;
        next()
    } catch (error) {
       console.log(error.message); 
    }
}
module.exports = { auth };