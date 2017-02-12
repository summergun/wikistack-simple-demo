const app = require('express').Router();
const db = require('../db');

module.exports = app;

app.post('/', (req, res, next)=> {
  db.models.User.findOne({ where: { name: req.body.name }})
    .then( user => {
      if(user) return user;
      return db.models.User.create({ name: req.body.name });
    })
    .then( user => db.models.Story.create( { title: req.body.title, content: req.body.content, userId: user.id}))
    .then( story => res.redirect('/'))
    .catch( e => next(e));
});

app.get('/:title', (req, res, next)=> {
  let story;
  db.models.Story.findOne({ 
    where: { title: req.params.title },
    include: [ db.models.User ]
  })
    .then( _story => {
        story = _story;
        return db.models.Story.findAll({
          where: { 
            userId: story.userId,
            id: { $ne: story.id }
          }
        });
    })
    .then( stories => res.render('story', { story, stories }))
    .catch( e => next(e));
});
