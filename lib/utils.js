module.exports.parseQuery = function parseQuery(options) {
  if(options === null || options === undefined) {
    return ``;
  }

  const queries = Object.keys(options)
                    .filter(key => options[key] !== null)
                    .map(key => `${key}=${options[key]}`);
  return `?${queries.join('&')}`;
}

module.exports.wait = function wait(time) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time);
  });
}

module.exports.timeUntil = function timeUntil(future) {
  return Date.parse(future) - new Date();
}
