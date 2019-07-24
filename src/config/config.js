const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "use_env_variable": "DATABASE_URL"
  },
  "test": {
    "username": "postgres",
    "password": null,
    "database": "notex_test",
    "host": "localhost",
    "dialect": "postgres"
  }
}