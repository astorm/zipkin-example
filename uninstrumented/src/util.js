const getUrlContents = function(url, fetch) {
  return fetch(url).then(res => res.text());
}

module.exports = {
  getUrlContents
}
