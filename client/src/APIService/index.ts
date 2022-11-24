const fetchEnglishK = async (difficulty: 'EASY' | 'MEDIUM' | 'HARD', wordAmount: number) => {
  let Words = await fetch(`http://localhost:3000/${difficulty}.txt`);
  let temp = await Words.text();
  let words = APIservice.Shuffle(temp.split(' '))
    .slice(0, wordAmount)
    .join(' ')
    .split('');

  const wordObjects = words.map((letter) => {
    return { letter: letter, correct: 'neutral', active: 'false' };
  });

  return wordObjects;
};

const Shuffle = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const FetchQuotes = async (length: number, lengthMax: number = 350) => {
  const URL = `https://api.quotable.io/random`;
  const response = await fetch(
    `${URL}?minLength=${length}&maxLength=${lengthMax}`
  );
  const data = await response.json();
  return data;
};

interface loginUser {
  username: string,
  password: string,
}

export interface updateUser {
  date: number,
  text: string,
  speed: number,
  incorrect: number,
  wordAmount: number,
  typingMode: 'WORDS' | 'QUOTES',
  difficulty: 'EASY' | 'MEDIUM' | 'HARD',
};

const register = (user: loginUser & {email: string}) => {
  return fetch(`http://localhost:4000/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const login = (user: loginUser) => {
  return fetch(`http://localhost:4000/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

const profile = () => {
  return fetch(`http://localhost:4000/profile`, {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));  
};

const update = (user: updateUser) => {
  return fetch(`http://localhost:4000/update`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

const logout = () => {
  return fetch(`http://localhost:4000/logout`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => console.log(err));
};

const APIservice = {
  fetchEnglishK,
  Shuffle,
  logout,
  update,
  profile,
  login,
  register,
  FetchQuotes
}

export default APIservice;
