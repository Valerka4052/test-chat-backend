const Chatroom = require('../models/ChatRoom');

const createChatRoom = async (req, res) => {
    try {
        // const { id } = req.payload;
        const { name } = req.body;
        if (!name) return res.json('name is require to create chat room');
        const checkRoom = await Chatroom.findOne({ name });
        if (checkRoom) return res.json('Chatroom is already exists');
        const room = (await Chatroom.create(req.body));
        res.json(room._doc);
    } catch (error) {
        console.log(error.message);
    }
};

const getAllChatRooms = async (req, res) => {
    try {
        const chatRooms = await Chatroom.find().populate('user')
        res.status(200).json(chatRooms);
    } catch (error) {
        console.log(error);
    }
};

const getChatRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        const chatRoom = await Chatroom.findOne({ _id: id });
        if(!chatRoom) return res.status(404).json('not found')
        res.status(200).json(chatRoom);
    } catch (error) {
        console.log(error);
    }
};



module.exports = { createChatRoom, getAllChatRooms, getChatRoomById };