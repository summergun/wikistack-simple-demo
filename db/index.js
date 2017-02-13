const db = require('./db');
const User = require('./User');
const Story = require('./Story');

Story.belongsTo(User,{onDelete:'CASCADE'});
User.hasMany(Story);

const sync = ()=> {
  return db.sync({ force: true });
};

const seed = ()=> {
  return sync()
  .then(()=>Story.createStory('prof','Foo','foo foo foo','foo'))
  .then(()=>Story.createStory('prof','Bar','bar bar bar','bar'))
    .then(()=>Story.createStory('Moro','Bazz','baz baz baz','bazz'))
      .then(()=>Story.createStory('Moro','Barz','barz barz barz','barz,foo,bar'))
    // .then( ()=> User.create({ name: 'prof'}))
    // .then( user => Story.create({ title: 'Foo', content: 'foo foo foo', userId: user.id, tags: ['foo'] }))
    // .then( story => Story.create({ title: 'Bar', content: 'bar bar bar', userId: story.userId, tags: ['bar'] }))
    // .then( ()=> User.create({ name: 'mitch'}))
    // .then( user => Story.create({ title: 'Bazz', content: 'bazz bazz bazz', userId: user.id, tags: ['bazz'] }))
    // .then( story => Story.create({ title: 'Foo Bar', content: 'foo bar foo bar', userId: story.userId, tags: ['foo', 'bar'] }));
};

module.exports = {
  models: {
    User,
    Story
  },
  seed,
  sync
};
