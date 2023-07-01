const chatRouter = require('express').Router();
const { catchErrors } = require('../hadlers/errorHandlers');
const { createChatRoom,getAllChatRooms } = require('../controllers/chatRoomController');
const { auth } = require('../middlewares/auth');

// chatRouter.post('/', auth, catchErrors(createChatRoom));
chatRouter.post('/',auth, catchErrors(createChatRoom));
chatRouter.get('/',auth, catchErrors(getAllChatRooms));


module.exports = chatRouter;