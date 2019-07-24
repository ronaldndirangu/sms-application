const Message = require('../database/models').Message;

module.exports = {
  createMessage: async(req, res) => {
    try {
      const { id: senderId } = req.user;
      const { message, receiverId } = req.body;
      const createdMessage = await Message.create({
        message,
        status: true,
        senderId,
        receiverId
      });
      return res.status(201).json({
        status: createdMessage.status ? 'sent' : 'not sent',
        message: createdMessage
      })
    } catch (error) {
      return res.status(500).json({
        error: 'An error occured when trying to create the Message!'
      });
    }
  },
  getMessage: async (req, res) => {
    try {
      const { id } = req.params;
      const { id: senderId } = req.user;
      const message = await Message.findOne({ where: { id, senderId } });
      if (!message) return res.status(404).json({
        error: 'Message not found!'
      });
      return res.status(200).json({
        status: message.status ? 'sent' : 'not sent',
        message
      });
    } catch (error) {
      return res.status(500).json({
        error: 'An error occured when trying to retrieved the message!'
      });
    }
  },
  updateMessage: async(req, res) => {
    try {
      const { id } = req.params;
      const { id: senderId } = req.user;
      const updatedMessage = await Message.update(
        { message },
        { 
          returning: true,
          where: { id, senderId }
        }
      );
      if (updatedMessage[0] === 0) return res.status(404).json({
        error: 'Message not found!'
      });
      return res.status(201).json({
        status: updatedMessage.status ? 'sent' : 'not sent',
        message: updatedMessage
      })
    } catch (error) {
      return res.status(500).json({
        error: 'An error occured when trying to update the message!'
      });
    }
  },
  deleteMessage: async (req, res) => {
    try {
      const { id } = req.params;
      const { id: senderId } = req.user;
      const deletedMessage = await Message.destroy({ returning: true, where: { id, senderId }})
      if (!deletedMessage) return res.status(404).json({
        error: 'Message not found!'
      });
      return res.status(200).json({
        message: 'Message delete successfully!',
        deletedMessage
      });
    } catch (error) {
      return res.status(500).json({
        error: 'An error occured when trying to delete the message!'
      });
    }
  },
  getSentMessages: async (req, res) => {
    try {
      const { id: senderId } = req.user;
      const messages = await Message.findAll({ returning: true, where: { senderId } });
      if (messages.length < 1) {
        return res.status(200).json({
          message: 'There are no messages currently'
        });
      }
      return res.status(200).json({
        message: 'Messages retrieved successfully!',
        messages: messages && messages.map(message => { return { status: message.status ? 'sent' : 'not sent', message } })
      });
    } catch(error) {
      return res.status(500).json({
        error: 'An error occured when trying to get your messages!'
      });
    }
  },
  getReceivedMessages: async (req, res) => {
    try {
      const { id: receiverId } = req.user;
      const messages = await Message.findAll({ returning: true, where: { receiverId } });
      if (messages.length < 1) {
        return res.status(200).json({
          message: 'There are no messages currently'
        });
      }
      return res.status(200).json({
        message: 'Messages retrieved successfully!',
        messages: messages && messages.map(message => { return { status: message.status ? 'sent' : 'not sent', message } })
      });
    } catch(error) {
      return res.status(500).json({
        error: 'An error occured when trying to get your messages!'
      });
    }
  }
}