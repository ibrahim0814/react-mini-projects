import React, { useEffect, useState } from "react";
import { words } from "./words";
// Criteria for success

// 5 x 5 board
// User can enter 5 words
// If the letter is in the right place, we color the square green
// If the letter is in the wrong place, we color the square yellow
// If the letter doesn't exist, we color the square gray
// If the input is right we display a success message
// Display a message when the game is over with the correct word if user cannot guess

const RenderGuess = ({ guess, correctWord, shouldShowBackground }) => {
  // TIP: could've used Array(5).fill( {char: null, style: null})
  const [guessCharArr, setGuessCharArr] = useState([
    {
      char: null,
      style: null,
    },
    {
      char: null,
      style: null,
    },
    {
      char: null,
      style: null,
    },
    {
      char: null,
      style: null,
    },
    {
      char: null,
      style: null,
    },
  ]);

  const correctLetterStyles = {
    backgroundColor: "green",
  };

  const misplacedLetterStyles = {
    backgroundColor: "orange",
  };

  const incorrectLetterStyles = {
    backgroundColor: "gray",
  };

  useEffect(() => {
    if (guess && guess.length > 0) {
      let guessCharArrCopy = [...guessCharArr];
      for (let i = 0; i < guess.length; i++) {
        let styles = null;
        guessCharArrCopy[i].char = guess[i];

        if (guess[i] === correctWord[i]) {
          styles = correctLetterStyles;
        } else if (correctWord.includes(guess[i])) {
          styles = misplacedLetterStyles;
        } else {
          styles = incorrectLetterStyles;
        }

        guessCharArrCopy[i].style = styles;
      }
      setGuessCharArr(guessCharArrCopy);
    }
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {guessCharArr &&
        guessCharArr.map((charObj) => {
          let charStyles = charObj.style;
          if (!shouldShowBackground) {
            charStyles = null;
          }
          return (
            <div
              key={Math.random() * 1000}
              style={{
                width: "50px",
                height: "50px",
                border: "1px solid white",
                ...charStyles,
              }}
            >
              {charObj.char}
            </div>
          );
        })}
    </div>
  );
};

const Worldle = () => {
  const [correctWord, setCorrectWord] = useState(null);

  // TIP: Could've used Array(5).fill({guess: null, shoudShowBackground: false})
  const [guesses, setGuesses] = useState([
    {
      guess: null,
      shouldShowBackground: false,
    },
    {
      guess: null,
      shouldShowBackground: false,
    },
    {
      guess: null,
      shouldShowBackground: false,
    },
    {
      guess: null,
      shouldShowBackground: false,
    },
    {
      guess: null,
      shouldShowBackground: false,
    },
  ]);

  const [currentGuess, setCurrGuess] = useState([]);

  const [indexGuess, setIndexGuess] = useState(0);

  const [isGameOver, setIsGameOver] = useState(false);

  const processWordleWords = () => {
    let resultsArr = [];
    const singleLineArray = words.split(`\n`);
    for (let entry of singleLineArray) {
      const splitBySpaceArr = entry.split(" ");
      resultsArr.push(splitBySpaceArr[5]);
    }
    getCorrectWord(resultsArr);
  };

  const getCorrectWord = (resultsArr) => {
    const randNum = Math.floor(Math.random() * 100) - 1;
    const corrWord = resultsArr[randNum];
    setCorrectWord(corrWord);
  };

  const handleKeyDown = (event) => {
    if (indexGuess === 5 || isGameOver) {
      return;
    }
    if (event.key === "Backspace") {
      let currGuessCopy = [...currentGuess];
      currGuessCopy.pop();
      setCurrGuess(currGuessCopy);
      let copyGuessesArray = [...guesses];
      copyGuessesArray[indexGuess].guess = currGuessCopy.join("");
      setGuesses(copyGuessesArray);
    } else if (event.key === "Enter") {
      if (currentGuess.length === 5) {
        if (currentGuess === correctWord) {
          console.log("game over");
          setIsGameOver(true);
        } else {
          let copyGuessesArray = [...guesses];
          copyGuessesArray[indexGuess].guess = currentGuess.join("");
          copyGuessesArray[indexGuess].shouldShowBackground = true;
          setGuesses(copyGuessesArray);
          setCurrGuess([]);
          setIndexGuess(indexGuess + 1);
        }
      }
    } else {
      if (currentGuess.length < 5 && !isGameOver) {
        let currGuessCopy = [...currentGuess];
        currGuessCopy.push(String.fromCharCode(event.keyCode));
        setCurrGuess(currGuessCopy);
        let copyGuessesArray = [...guesses];
        copyGuessesArray[indexGuess].guess = currGuessCopy.join("");
        setGuesses(copyGuessesArray);
      }
    }
  };

  useEffect(() => {
    processWordleWords();
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // cleanup this component
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div>
      {guesses &&
        guesses.map((guess) => {
          return (
            <RenderGuess
              correctWord={correctWord}
              guess={guess.guess}
              key={Math.random() * 1000}
              shouldShowBackground={guess.shouldShowBackground}
            />
          );
        })}
    </div>
  );
};

export default Worldle;
