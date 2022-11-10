import { useOutletContext, useNavigate } from "react-router-dom";

const APIservice = {};

APIservice.fetchEnglishK = async (num, wordAmount) => {
  let Words = await fetch(`http://localhost:3000/${num}k.txt`);
  let final = await Words.text();
  final = APIservice.Shuffle(final.split(" "))
    .slice(0, wordAmount)
    .join(" ")
    .split("");

  final = final.map((letter) => {
    return { letter: letter, correct: "neutral", active: "false" };
  });

  return final;
};

APIservice.Shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

APIservice.FetchQuotes = async (length, lengthMax) => {
  const URL = `api.quotable.io/random`;
  const response = await fetch(
    `https://api.quotable.io/random?minLength=${length}&maxLength=#{lengthMax}`
  );
  const data = await response.json();
  return data;
};

export default APIservice;
