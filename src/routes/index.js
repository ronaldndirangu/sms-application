const contactRouter = require('./contactRouter');
const messageRouter = require('./messageRouter');
const authRouter = require('./authRouter');

const apiPrefix = '/api/v1';

module.exports = (app) => {
  app.use(apiPrefix, contactRouter);
  app.use(apiPrefix, messageRouter);
  app.use(apiPrefix, authRouter);
}
