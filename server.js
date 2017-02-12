const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE_URL);

const User = db.define('user', {
  name: db.Sequelize.STRING
});

const Story = db.define('story', {
  title: db.Sequelize.STRING, 
  content: db.Sequelize.TEXT
});

Story.belongsTo(User);
User.hasMany(Story);

const sync = ()=> {
  return db.sync({ force: true });
};

const seed = ()=> {
  return sync()
    .then( ()=> User.create({ name: 'prof'}))
    .then( user => Story.create({ title: 'Foo', content: 'foo foo foo', userId: user.id }))
    .then( story => Story.create({ title: 'Bar', content: 'bar bar bar', userId: story.userId }))
    .then( ()=> User.create({ name: 'mitch'}))
    .then( user => Story.create({ title: 'Bazz', content: 'bazz bazz bazz', userId: user.id }));
};


  seed()
  .then( ()=> console.log('your data is seeded'))
  .catch( e => console.log(e));
