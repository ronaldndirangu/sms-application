const express = require('express');
const authController = require('../controllers/authController');
const validateSignupPayload = require('../middlewares/validator').validateSignupPayload;
const validateSigninPayload = require('../middlewares/validator').validateSigninPayload;

const authRouter = express.Router();

authRouter.post('/auth/signup', validateSignupPayload, authController.signupContact);
authRouter.post('/auth/signin', validateSigninPayload, authController.signinContact);

module.exports = authRouter;
