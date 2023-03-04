import "./App.css";
import React from "react";
import ExampleOne from "./fetch-api/1";
import CounterFunctionalComponent from "./counter/counter-fc";
import CounterClassBasedComponent from "./counter/counter-class";
import TicTacToe from "./tic-tac-toe";
import Worldle from "./wordle/wordle";
import GameOfLife from "./game-of-life/game_of_life";
import UsersChallenge from "./react-users-challenge";
import TopalGlassdoor from "./topal-glassdoor";
import CustomProgressBar from "./custom-progress-bar";
import Minesweeper from "./minesweeper";
import BikeRental from "./bike-rental/bike-rental";
import SearchDebounce from "./search-debounce";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GameOfLife />
      </header>
    </div>
  );
}

export default App;
