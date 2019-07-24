const express = require('express');
const messageController = require('../controllers/messageController');
const authenticate = require('../middlewares/authenticate');

const messageRouter = express.Router();

messageRouter.get('/messages/sent', authenticate, messageController.getSentMessages);
messageRouter.get('/messages/received', authenticate, messageController.getReceivedMessages);
messageRouter.post('/messages', authenticate, messageController.createMessage);
messageRouter.get('/messages/:id',authenticate,  messageController.getMessage);
messageRouter.patch('/messages/:id', authenticate, messageController.updateMessage);
messageRouter.delete('/messages/:id', authenticate, messageController.deleteMessage);

module.exports =  messageRouter;