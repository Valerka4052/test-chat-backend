const express = require('express');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/chatroom',require('./routes/chatRoom'))
app.use('/user', require('./routes/user'));
app.use('/messages',require('./routes/messages'))
const errorhandlers = require('./hadlers/errorHandlers')
app.use(errorhandlers.notFound);
app.use(errorhandlers.mongoseErrors);
if (process.env.ENV === "DEVELOPMENT") {
    app.use(errorhandlers.developmentErrors)
} else {
    app.use(errorhandlers.productionErrors)
};

module.exports = app;
