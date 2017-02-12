const db = require('./db');
console.log(db.models);

  db.seed()
  .then( ()=> console.log('your data is seeded'))
  .catch( e => console.log(e));
