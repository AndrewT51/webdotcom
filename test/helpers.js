const chai = require('chai');
const expect = chai.expect;
const constants = require('../config/constants');
const {
  checkName,
  checkTimezone,
  checkBirthdate,
  checkPositionHeld
} = require('../helpers/validation');
const { queryBuilder } = require('../helpers/controllers');

describe('Validators', function(){
  describe('Name validator', function(){
    const MIN = constants.NAME.MIN_LENGTH;
    const MAX = constants.NAME.MAX_LENGTH;
    it('should not allow strings that are too long or short', function(done){
      expect(checkName('a'.repeat(MIN - 1))).to.be.false;
      expect(checkName('a'.repeat(MAX + 1))).to.be.false;
      done();
    })
    it('should allow strings of characters within the min/max range', function(done){
      expect(checkName('a'.repeat(MIN + 1))).to.be.true;
      expect(checkName('a'.repeat(MAX - 1))).to.be.true;
      done();
    })
    it('should not allow non-letter characters', function(done){
      expect(checkName('!'.repeat(MAX - 1))).to.be.false;
      expect(checkName('1'.repeat(MAX - 1))).to.be.false;
      expect(checkName(' '.repeat(MAX - 1))).to.be.false;
      done();
    })
  })

  describe('Timezone validator', function(){
    it('should allow recognised timezones (case insensitive)', function(done){
      expect(checkTimezone('utc')).to.be.true;
      expect(checkTimezone('Europe/London')).to.be.true;
      expect(checkTimezone('america/LOS_ANGELES')).to.be.true;
      done()
    })
    it('should not allow unrecognised timezones', function(done){
      expect(checkTimezone('ufc')).to.be.false;
      expect(checkTimezone('space/mars')).to.be.false;
      expect(checkTimezone('somewhere/else')).to.be.false;
      done();
    })
  })

  describe('Birthdate validator', function(){
    it('should not allow a date later than today', function(done){
      expect(checkBirthdate('2078-11-23')).to.be.false;
      done();
    })
    it('should not allow an invalid date', function(done){
      expect(checkBirthdate('hello')).to.be.false;
      expect(checkBirthdate('1978-45-34')).to.be.false;
      done();
    })
    it('should allow a date earlier than today', function(done){
      expect(checkBirthdate('1978-11-23')).to.be.true;
      done();
    })
  })

  describe('Position held validator', function(){
    const MIN = constants.POSITION_HELD.MIN_LENGTH;
    const MAX = constants.POSITION_HELD.MAX_LENGTH;
    it('should not allow any characters other than letters and spaces', function(done){
      expect(checkPositionHeld('g '.repeat(MAX/2 - 1))).to.be.true;
      expect(checkPositionHeld('g1'.repeat(MAX/2 - 1))).to.be.false;
      expect(checkPositionHeld('g!'.repeat(MAX/2 - 1))).to.be.false;
      done();
    })
    it('should not allow strings that are too long or short', function(done){
      expect(checkPositionHeld('a'.repeat(MIN - 1))).to.be.false;
      expect(checkPositionHeld('a'.repeat(MAX + 1))).to.be.false;
      done();
    })
    it('should allow strings of characters within the min/max range', function(done){
      expect(checkPositionHeld('a'.repeat(MIN + 1))).to.be.true;
      expect(checkPositionHeld('a'.repeat(MAX - 1))).to.be.true;
      done();
    })
  })
})

describe('Controller Helpers', function(){
  describe('Query builder', function(){
    it('should convert an object value into a regex', function(done){
      expect(queryBuilder({ name: 'Andy'}).name).to.be.a('regexp');
      expect(queryBuilder({ name: 'Andy'}).name).not.to.be.a('string');
      done();
    })
    it('should iterate through entire object and convert all values into regexp', function(done){
      const converted = queryBuilder({ name: 'Andy', surname: 'Trigg', dob: '1978-11-23'});
      expect(converted.name).to.be.a('regexp');
      expect(converted.surname).to.be.a('regexp');
      expect(converted.dob).to.be.a('regexp');
      done();
    })
  })
})

