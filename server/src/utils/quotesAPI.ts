async function FetchQuotes(length: number = 100, lengthMax: number = 300) {
  try {
    const response = await fetch(`https://api.quotable.io/random?minLength=${length}&maxLength=${lengthMax}`);
    const data = await response.json();
    return data.content.split(' ') as string[];
  } catch (error) {
    console.log('Error in FetchQuotes: ', error);
  }
}

export default FetchQuotes;
