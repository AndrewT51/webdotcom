## Employee Record API

### Libraries used

- bluebird - a promise library that I am used to using. Has some nice methods that the `global.Promise` doesn't, although up to this point, the `global.Promise` would have been sufficient.

- body-parser - parses either json or urlencoded requests, and attaches the parsed data to the body, params or query properties of the request.

- mongoose - this is an ORM that makes using MongoDB a lot easier. Makes it trivial to create schemas and has lots of nice methods for interacting with the database.

- morgan - a logging package. I used this so that a log file could be kept storing all the requests to the API.

- express - a minimalist framework for node.

- validator - a package to validate and sanitize strings.

- dotenv - loads environment variables from a `.env` file in the root of the project.

- moment-timezone - a library to validate, parse and display times. I used it in this project to validate timezones.

- nodemon - used for running the project in development, so that the server restarts on any changes to the code.

- mocha - a test library to run tests on the code.

- chai - an assertion library for use with the mocha library.

- forever - keep the script running continuously.


### How to use
Once you have cloned the repo from github run yarn install to get all dependencies installed.
To seed the database with a few users:`yarn run seed`
To run the tests: `yarn run test`
To run the app: `yarn run start`
To stop the app: `yarn run stop`

### Environment variables
You will need your own `.env` file, containing the following:
MONGO_URL=\<your mongo url here\>
PORT=\<your port here\>


### API Endpoints

**GET /users**
This route will return all users if no query strings are provided. Otherwise, results will be returned if they match the query; a match is classed as a case-insensitive matching sequence of characters, as with a SQL `LIKE %`.
The keys that are recognised are:

|Key         |Value type|Format                                  |Required
-------------|----------|----------------------------------------|---------
|name        | String   | Only letters                           |true
|surname     | String   | Only letters                           |true
|birthdate   | String   | YYYY-MM-DD                             |false
|timezone    | String   | Any valid timezone eg. Europe/London   |false
|positionHeld| String   | Only letters and spaces                |false

An examply query: `/users?name=il&surname=lo` would match a user with the name of Billy Bloggs.

**POST /users**
This route will create a new user. The content-type of the request should be `application/json` and the properties are as shown in the table above. Here is an example:

  ```
  {
  "name": "Robert",
  "surname": "Rogers",
  "birthdate": "1958-02-01",
  "positionHeld":"Software Engineer"
  }
  ```

**PUT /users/:id**
This route is used to update an existing user. The `id` parameter in the url should be that of the user you wish to update. Simply include in the body of the request the property of the user you wish to change and the new value it needs to be changed to. The updated customer record will be returned on successful update.

**DELETE /users/:id**
This route removes the record of the user with an ID matching that given in the url.

**GET /users/:id**
Get a specific user by ID.




