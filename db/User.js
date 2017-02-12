const db = require('./db');

const User = db.define('user', {
  name: db.Sequelize.STRING
});

module.exports = User;
