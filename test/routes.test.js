const expect = require('chai').expect;
const client = require('supertest')(require('../app'));

const db = require('../db');

describe('routes', ()=> {
  describe('with seeded data', ()=> {
    describe('GET /foos', ()=> {
      it('returns 404', (done)=> {
        client.get('/foos')
          .expect(404)
          .then( ()=> done())
          .catch( e=> done(e));
      });
    });
    describe('GET /', ()=> {
      it('contains my stories', (done)=> {
        client.get('/')
          .expect(200)
          .then( result => expect(result.text).to.contain('foo'))
          .then ( ()=> done())
          .catch( e => done(e));
      });
    });

    describe('GET /prof', ()=> {
      it('no bazz', (done)=> {
        client.get('/users/prof')
          .expect(200)
          .then(result => {
            expect(result.text).not.to.contain('bazz');
            expect(result.text).to.contain('foo');
          })
          .then( ()=> done())
          .catch( e => done(e))
      });
    });

    // test /stories/:title
    describe('GET /stories/Foo', ()=> {
      it('foo foo foo', (done)=> {
        client.get('/stories/Foo')
          .expect(200)
          .then(result => {
            expect(result.text).not.to.contain('bazz');
            expect(result.text).to.contain('foo');
          })
          .then( ()=> done())
          .catch( e => done(e))
      });
    });

    // test POST route
    describe('POST Tests', function() {
      it('should return the home if valid', (done) => {
        client
        .post('/stories')
        .send({name:'prof' , title:'new' , content:'short', tags:'tag,tag2'})
        .end(function(err, res) {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
      });


      let stories;
      before((done)=> {
        db.models.Story.findAll()
          .then( _stories => stories = _stories)
          .then( ()=> done())  
          .catch( err=> done(err));
      });

      it('increase stories by one', () => {
        expect(stories.length).to.equal(5);
      });

    });


  });
});

