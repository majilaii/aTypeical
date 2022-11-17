// TODO we might put this file in its own utils folder
// TODO do we need this fetch thingy?
const fetch = require('cross-fetch');

// TODO try...catch
async function FetchQuotes(length = 100, lengthMax = 300) {
  const response = await fetch(
    `https://api.quotable.io/random?minLength=${length}&maxLength=${lengthMax}`
  );
  const data = await response.json();
  return data.content.split(' ');
}

module.exports = FetchQuotes;
