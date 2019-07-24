const express = require('express');
const contactController = require('../controllers/contactController');
const authenticate = require('../middlewares/authenticate');

const contactRouter = express.Router();

contactRouter.get('/contacts', authenticate, contactController.getAllContacts);
contactRouter.get('/contacts/:id', authenticate, contactController.getContact);
contactRouter.patch('/contacts/:id', authenticate, contactController.updateContact);
contactRouter.delete('/contacts/:id', authenticate, contactController.deleteContact);

module.exports = contactRouter;
