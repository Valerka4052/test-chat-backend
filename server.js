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
    // console.log('socket.handshake.query',socket.handshake.query);
    const { token } = socket.handshake.query;
    // console.log('token',token);
    const { id } = await jwt.verify(token, SECRET_KEY);
    if (!id) return res.status(401).json('Not authorized');
    // console.log('id',id);
    socket.userId = id;
    next();
  } catch (error) {
    console.log(error.message);
  };
});
io.on("connection", (socket) => {
  socket.on('chatRoom', async ({ chatRoomId }) => {
    socket.join(chatRoomId);
    console.log(`user ${socket.userId} join to ${chatRoomId}`);
  });
  socket.on('leaveChatRoom', ({ chatRoomId }) => {
    socket.leave(chatRoomId);
    console.log(`user live ${chatRoomId}`);
  });
  socket.on('message', async (chatRoomId, message) => {
    await Message.create({ message, chatroom: chatRoomId, user: socket.userId });
    await ChatRoom.findByIdAndUpdate(chatRoomId, { $inc: { commentsCount: 1 } });
    const allMessages = await Message.find({ chatroom: chatRoomId }).populate('user');
    io.in(chatRoomId).emit('allMessages', allMessages);
  });
  socket.on('disconnect', () => console.log(`DISconnected ${socket.userId}`));
});



