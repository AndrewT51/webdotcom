process.env.NODE_ENV = 'test';
require('dotenv').config();
const server = require('../app');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const chai = require('chai');
const chaiHTTP = require('chai-http');

chai.use(chaiHTTP);
const expect = chai.expect;

const validUser = {
  "name": "Billy",
  "surname": "Bloggs",
  "birthdate": "1978-02-01",
  "positionHeld":"Software Engineer",
  "timezone":"UTC"
}
let userId;

const invalidUser = Object.assign({}, validUser, {name: '234'})

const expectedKeys = [
  'createdAt',
  'updatedAt',
  'name',
  'surname',
  'birthdate',
  'positionHeld',
  'timezone'
]

User.remove({})
.then(() => {
  describe('User routes', function(){
    it('should be able to create a new user with valid fields', function(done){
      chai.request(server)
      .post('/users')
      .set('content-type', 'application/json')
      .send(validUser)
      .end(function(err, res, body){
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.all.keys(expectedKeys);
        expect(res.body).to.have.a.property('createdAt');
        userId = res.body._id
        done()
      })
    })

    it('should not be able to create a new user with invalid fields', function(done){
      chai.request(server)
      .post('/users')
      .set('content-type', 'application/json')
      .send(invalidUser)
      .end(function(err, res, body){
        expect(res).to.have.status(400);
        expect(res.body).to.have.a.property('errors');
        done()
      })
    })

    it('should be able to update a user with valid fields', function(done){
      chai.request(server)
      .put(`/users/${userId}`)
      .set('content-type', 'application/json')
      .send({ name: 'Jimmy'})
      .end(function(err, res, body){
        expect(res).to.have.status(200);
        expect(res.body).to.include.all.keys(expectedKeys);
        done()
      })
    })

    it('should not be able to update a user with invalid fields', function(done){
      chai.request(server)
      .put(`/users/${userId}`)
      .set('content-type', 'application/json')
      .send({ name: '!asdf234'})
      .end(function(err, res, body){
        expect(res).to.have.status(400);
        expect(res.body).to.have.a.property('errors');
        done()
      })
    })

    it('should be able to get all users', function(done){
      chai.request(server)
      .get(`/users`)
      .end(function(err, res, body){
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.include.all.keys(expectedKeys);
        done()
      })
    })

    it('should be able to get a user', function(done){
      chai.request(server)
      .get(`/users/${userId}`)
      .end(function(err, res, body){
        expect(res).to.have.status(200);
        expect(res.body).to.include.all.keys(expectedKeys);
        done()
      })
    })

    it('should be able to delete a user', function(done){
      chai.request(server)
      .delete(`/users/${userId}`)
      .end(function(err, res, body){
        expect(res).to.have.status(200);
        expect(res.body).to.include.all.keys(expectedKeys);
        done()
      })
    })
  })
})