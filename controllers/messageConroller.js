const Message = require("../models/Message");
// const Chatroom = require("../models/ChatRoom");

const getAllMessagesByChatroom = async (req, res) => {
    try {
        const { id } = req.body;
         if (!id) return res.json('something went wrong');
        const allMessages = await Message.find({ chatroom: id }).populate('user');
        return res.json(allMessages);
    } catch (error) {
        return res.json('something went wrong');
    };
};
const getAllMessagesByUser = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.json('something went wrong');
        const allMessages = await Message.find({ user: id }).populate('user chatroom');
        return res.json(allMessages);
    } catch (error) {
        return res.json('something went wrong');
    };
};


module.exports = { getAllMessagesByChatroom, getAllMessagesByUser };