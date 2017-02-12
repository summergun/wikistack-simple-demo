const db = require('./db');

const Story = db.define('story', {
  title: db.Sequelize.STRING, 
  content: db.Sequelize.TEXT,
  tags: {
    type: db.Sequelize.ARRAY(db.Sequelize.STRING),
    defaultValue: []
  }
}, {
  getterMethods: {
    summary: function(){
      return this.content.slice(0, 4).toString() + '...';
    }
  }
});

module.exports = Story;
