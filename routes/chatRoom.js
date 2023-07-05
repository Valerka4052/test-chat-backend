const chatRouter = require('express').Router();
const { catchErrors } = require('../hadlers/errorHandlers');
const { createChatRoom, getAllChatRooms, getChatRoomById } = require('../controllers/chatRoomController');
const { auth } = require('../middlewares/auth');

// chatRouter.post('/', auth, catchErrors(createChatRoom));
chatRouter.post('/', catchErrors(createChatRoom));
chatRouter.get('/',  catchErrors(getAllChatRooms));
chatRouter.get('/:id',  catchErrors(getChatRoomById));

module.exports = chatRouter;