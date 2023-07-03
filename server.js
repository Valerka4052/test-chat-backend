require('dotenv').config();
const jwt = require('jsonwebtoken');
const { DATABASE, PORT = 8000, SECRET_KEY } = process.env;
const mongoose = require('mongoose');
mongoose.connect(DATABASE, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.connection.on('error', err => console.log('Moongoose Connection error' + err.message));
mongoose.connection.once('open', () => console.log('mongoDB connected!!!'));

const ChatRoom = require('./models/ChatRoom');
// const User = require('./models/User');
const Message = require('./models/Message');

const app = require('./app');

const server = app.listen(8000, () => console.log('Server running on port 8000'));
const io = require('socket.io')(server,{
  allowEIO3: true,
  cors: {
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true
  }
})

io.use(async (socket, next) => {
  try {
    const { token } = socket.handshake.query;
    const { id } = await jwt.verify(token, SECRET_KEY);
    if (!id) return res.json('Not authorized');
    socket.userId = id;
    next();
  } catch (error) {
    console.log(error.message);
  };
});
io.on("connection", (socket) => {
  socket.on('chatRoom', async ({ chatRoomId }) => {
    socket.join(chatRoomId);
    console.log(`user join to ${chatRoomId}`);
  });
  socket.on('leaveChatRoom', ({ chatRoomId }) => {
    socket.leave(chatRoomId);
    console.log(`user live ${chatRoomId}`);
  });
  socket.on('message', async (chatRoomId, message) => {
    await Message.create({ message, chatroom: chatRoomId, user: socket.userId });
    const allMessages = await Message.find({ chatroom: chatRoomId }).populate('user');
    io.in(chatRoomId).emit('allMessages', allMessages);
  });
  socket.on('disconnect', () => console.log(`DISconnected ${socket.userId}`));
});



