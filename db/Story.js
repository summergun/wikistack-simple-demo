const db = require('./db');

const Story = db.define('story', {
  title: db.Sequelize.STRING, 
  content: db.Sequelize.TEXT
});

module.exports = Story;
