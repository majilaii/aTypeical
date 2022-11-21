async function FetchQuotes(length = 100, lengthMax = 300) {
  try {
    const response = await fetch(`https://api.quotable.io/random?minLength=${length}&maxLength=${lengthMax}`);
    const data = await response.json();
    return data.content.split(' ');
  } catch (error) {
    console.log('Error in FetchQuotes: ', error);
  }
}

module.exports = FetchQuotes;
