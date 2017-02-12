const db = require('./db');
const express = require('express');
const swig = require('swig');
swig.setDefaults({ cache: false });

const app = express();

app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.get('/', (req, res, next)=> {
  db.models.Story.findAll({
    include: [ db.models.User ]
  })
    .then( stories => res.render('index', { stories }))
    .catch( e => console.log(e));
});

const port = process.env.PORT || 3000;

app.listen(port, ()=> console.log(`listening on ${port}`));

db.seed()
.then( ()=> console.log('your data is seeded'))
.catch( e => console.log(e));
