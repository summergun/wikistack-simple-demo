const db = require('./db');
const User = require('./User');

const Story = db.define('story', 
{
  title: db.Sequelize.STRING,
  content: db.Sequelize.TEXT,
  tags: {
    type: db.Sequelize.ARRAY(db.Sequelize.STRING),
    defaultValue: []
  }
}, 
{
  getterMethods: {
      summary: function () {
        return this.content.slice(0, 4).toString() + '...';
      }
  },
  classMethods: {
      createStory: (name, title, content, tags) => {
        return User.findOne({ where: { name: name } })
          .then(user => {
            if (user) return user;
            return User.create({ name: name });
          })
          .then(user => Story.create({ title: title, content: content, userId: user.id, tags: tags.split(',') }))


      }
  }
}
);

module.exports = Story;
