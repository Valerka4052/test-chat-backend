const Chatroom = require('../models/ChatRoom');

const createChatRoom = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) res.json('name is require to create chat room');
        const checkRoom = await Chatroom.findOne({ name });
        if (checkRoom) return res.json('Chatroom is already exists');
        const room = await Chatroom.create({ name });
        res.json(room._doc);

    } catch (error) {
        console.log(error.message);
    }
};

const getAllChatRooms = async (req, res) => {
    try {
        const chatRooms = await Chatroom.find()
        res.status(200).json(chatRooms);
    } catch (error) {
        console.log(error);
    }
};



module.exports = { createChatRoom,getAllChatRooms };