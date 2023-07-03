const chatRouter = require('express').Router();
const { catchErrors } = require('../hadlers/errorHandlers');
const { createChatRoom, getAllChatRooms, getChatRoomById } = require('../controllers/chatRoomController');
const { auth } = require('../middlewares/auth');

// chatRouter.post('/', auth, catchErrors(createChatRoom));
chatRouter.post('/',auth, catchErrors(createChatRoom));
chatRouter.get('/', auth, catchErrors(getAllChatRooms));
chatRouter.get('/:id', auth, catchErrors(getChatRoomById));

module.exports = chatRouter;