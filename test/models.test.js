const expect = require('chai').expect;
const db = require('../db');

describe('Models', ()=> {
  beforeEach((done)=> {
    db.seed()
      .then(()=> done())
      .catch( e => done(e));
  });

  describe('Story', ()=> {
    let stories;
    beforeEach((done)=> {
      db.models.Story.findAll()
        .then( _stories=> stories = _stories )
        .then( ()=> done())
        .catch( e => done(e));
    });

    describe('seeded data', ()=> {
      it('there are 4 stories', ()=> {
        expect(stories.length).to.equal(4);
      });
    });
  });

  describe('User', ()=> {
    it('exists', ()=> {
      expect(db.models.User).to.be.ok;
    });

    describe ('check delete user',()=>{
      beforeEach((done)=>{
        db.models.User.deleteUser('prof')
        .then(()=>done());
      })
      let users;
      beforeEach((done)=> {
        db.models.User.findAll()
          .then( _users => users = _users)
          .then( ()=> done())  
          .catch( err=> done(err));
      });
      let stories;
      beforeEach((done)=> {
        db.models.Story.findAll()
          .then( _stories => stories = _stories)
          .then( ()=> done())  
          .catch( err=> done(err));
      });
      it('delete stories',()=>{
        expect(stories.length).to.equal(2);
      })
      it('delete user',()=>{
        expect(users.length).to.equal(1);
      })
    })

    describe('seeded data', ()=> {
      let users;
      beforeEach((done)=> {
        db.models.User.findAll()
          .then( _users => users = _users)
          .then( ()=> done())  
          .catch( err=> done(err));
      });

      let newUsers;
      beforeEach((done)=> {
        db.models.Story.createStory('prof','title','sadjaksdj jk ajsdlkaj d','momo')
          .then(()=>db.models.User.findAll())
          .then( _users => newUsers = _users)
          .then( ()=> done())
          .catch( e=> done(e));
      });

      it('same name no dups', ()=>{
        expect(newUsers.length).to.equal(2)
      });
      it('there are two users', ()=> {
        expect(users.length).to.equal(2);
      });

    });

    

  });
});
