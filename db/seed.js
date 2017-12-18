require('./index');
const mongoose = require('mongoose');

const User = mongoose.model('User');

const users = [
  {
    name: 'Billy',
    surname: 'Bloggs',
    birthdate: '1978-02-01',
    positionHeld: 'Software Engineer',
    timezone: 'UTC',
  },
  {
    name: 'Robbie',
    surname: 'Reynolds',
    birthdate: '1985-10-23',
    positionHeld: 'Tennis coach',
    timezone: 'Europe/London',
  },
  {
    name: 'Jennifer',
    surname: 'Graham',
    birthdate: '1983-09-17',
    positionHeld: 'Taxi driver',
    timezone: 'America/Los_Angeles',
  },
  {
    name: 'Bert',
    surname: 'Ernie',
    birthdate: '1982-03-07',
    positionHeld: 'Teacher',
    timezone: 'Europe/London',
  },
  {
    name: 'Danny',
    surname: 'Gilbert',
    birthdate: '1983-12-28',
    positionHeld: 'Chef',
    timezone: 'America/Los_Angeles',
  },
];

User.collection.insertMany(users, () => {
  console.log(`${users.length} users added to the database`);
  mongoose.connection.close();
});

