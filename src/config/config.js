const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres"
  },
  "production": {
    "use_env_variable": "DATABASE_URL",
    "dialect": "postgres"
  },
  "test": {
    "username": "postgres",
    "password": null,
    "database": "notex_test",
    "host": "localhost",
    "dialect": "postgres"
  }
}