const fetch = require('cross-fetch')


async function FetchQuotes (length = 30 , lengthMax = 300) {
    const response = await fetch(
      `https://api.quotable.io/random?minLength=${length}&maxLength=${lengthMax}`
    );
    const data = await response.json();
    return data.content.split(" ")
  };

module.exports = FetchQuotes



   