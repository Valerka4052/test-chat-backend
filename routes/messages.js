const messageRouter = require('express').Router();
const { catchErrors } = require('../hadlers/errorHandlers');
const { getAllMessagesByChatroom, getAllMessagesByUser } = require('../controllers/messageConroller');
const { auth } = require('../middlewares/auth');

messageRouter.post('/chat', auth, catchErrors(getAllMessagesByChatroom));
messageRouter.get('/user', auth, catchErrors(getAllMessagesByUser));

module.exports = messageRouter;