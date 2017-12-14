const chai = require('chai');
const expect = chai.expect;
const { FIELDS_TO_SANITIZE } = require('../config/constants');
const { validateUser, sanitizeUser } = require('../middleware');
const validUser = {
  name: 'Andrew',
  surname: 'Trigg',
  birthdate: '1978-11-23',
  positionHeld: 'Web dot com',
  timezone: 'utc'
}
const badlyFormedUser = {
  name: '   Andrew  '
}

describe('Middleware', function(){

  const invalidUser1 = Object.assign({}, validUser, {name: '123'})
  const invalidUser2 = Object.assign({}, validUser, {surname: '123'})
  const invalidUser3 = Object.assign({}, validUser, {birthdate: '123'})
  const invalidUser4 = Object.assign({}, validUser, {positionHeld: '123'})
  const invalidUser5 = Object.assign({}, validUser, {timezone: '123'})

  describe('Validation middleware', function(){
    it('Should only allow correctly validated users to pass', function(done){
      const fail = () => {
        expect(false).to.be.true
        done()
      }
      const success = () =>{
        expect(true).to.be.true
        done()
      }

      // expect(validateUser({ body: validUser }, null, done)).to.be.true;
      // expect(validateUser({ body: invalidUser1 }, null, done)).to.be.false;
      // expect(validateUser({ body: invalidUser2 }, null, done)).to.be.false;
      // expect(validateUser({ body: invalidUser3 }, null, done)).to.be.false;
      // expect(validateUser({ body: invalidUser4 }, null, done)).to.be.false;
      // expect(validateUser({ body: invalidUser5 }, null, done)).to.be.false;
      function next(){
        validateUser({body: validUser}, { send: fail }, success )
      }

      validateUser({body: invalidUser1}, { send: next}, fail)


    })
  })

  // describe('Sanitizing middleware', function(){
  //   // a collection of the formatting errors handled by the sanitizer
  //   const forms = [ '  padded  ', '<>', 'space   between'];

  //   // allocate a formatting error to each of the required fields
  //   const badlyFormed = {};
  //   FIELDS_TO_SANITIZE.forEach( (field, index) => {
  //     badlyFormed[field] = forms[index%3]
  //   })

  //   it('Should trim the fields', function(done){
  //     expect(sanitizeUser({ body: badlyFormed }, null, done)).to.be.true;
  //   })
  // })
})