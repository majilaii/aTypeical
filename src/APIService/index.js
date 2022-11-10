function shuffle(array) {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex != 0) {
  
      
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }


async function fetchQuotes() {
    const URL = `api.quotable.io/random`
    const response = await fetch(`https://api.quotable.io/random?minLength=150&maxLength=300`)
    const data = await response.json()
    console.log(data)
    
}




export {fetchQuotes, shuffle}