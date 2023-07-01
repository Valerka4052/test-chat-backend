require('dotenv').config();
const jwt = require('jsonwebtoken');
const { DATABASE, PORT = 8000 } = process.env;
const mongoose = require('mongoose');
mongoose.connect(DATABASE, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.on('error', err => console.log('Moongoose Connection error' + err.message));
mongoose.connection.once('open', () => console.log('mongoDB connected!!!'));

const ChatRoom = require('./models/ChatRoom');
const User = require('./models/User');
const Message = require('./models/Message');

const app = require('./app');

const server = app.listen(PORT, () => console.log('Server running on port 8000'));
const io = require('socket.io')(server,{
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true
  }
});
io.use(async(socket, next) => {
    try {
        const {token} = socket.handshake.query;
        const payload = jwt.verify(token, 'lhvklhb');
        if (!payload) return res.json('Not authorized');
            console.log(payload);
        socket.userId = payload.id;
        next();
    } catch (error) {
       console.log(error.message); 
    }
});
io.on("connection", (socket) => {
    console.log(`Connected ${socket.userId}`);
    socket.on('chatRoom', async ({ chatRoomId }) => {
          
        socket.join({ chatRoomId });
        console.log(`user join to ${chatRoomId}`);
         const allMessages = await Message.find({ chatroom: chatRoomId }).populate('User')
        socket.emit('allMessages', allMessages);
    });
    socket.on('leaveChatRoom', ({ chatRoomId }) => {
        socket.leave({ chatRoomId });
        console.log(`user live ${chatRoomId}`);
    })
  socket.on('message',async (data) => {
        const newMessage = { ...data, user: socket.userId }
        await Message.create(newMessage);
        const allMessages = await Message.find({ chatroom: data.chatroom }).populate('User')
       io.emit('allMessages', allMessages);

  })
    //  socket.on('channel',async (name) => {
    //     const newMessage = { ...data, user: socket.userId }
    //     await Message.create(newMessage);
    //     const allMessages = await Message.find({ chatroom: data.chatroom });
    //    io.emit('allMessages', allMessages);

    // })
    socket.on('disconnect', () => console.log(`DISconnected ${socket.userId}`));
})