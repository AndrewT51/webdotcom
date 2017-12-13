// This function iterates through the querystring arguments
// and returns the values as regular expressions
exports.queryBuilder = queryString => {
  const query = {};
  const objKeys = Object.keys(queryString);
  objKeys.forEach( key => {
    query[key] = new RegExp(queryString[key], 'i')
  })
  return query
}