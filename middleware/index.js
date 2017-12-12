// I took this middleware from https://medium.com/@Abazhenov/using-async-await-in-express-with-node-8-b8af872c0016
// used to wrap async functions with error handling instead of throwing try/catch statements in every route

exports.asyncMiddleware = fn =>
  (req, res, next) => {
    return Promise.resolve(fn(req, res, next))
    .catch(next);
  };
