import React, { useEffect, useRef, useState } from "react";

const BoardSquare = ({ alive, onClickSquare, colIndex, rowIndex }) => {
  let background = "black";
  if (alive) {
    background = "orange";
  }
  return (
    <div
      onClick={() => onClickSquare(rowIndex, colIndex)}
      style={{
        width: "10px",
        height: "10px",
        border: ".5px solid white",
        backgroundColor: `${background}`,
      }}
    ></div>
  );
};

const GameBoard = ({ squares, onClickSquare }) => {
  return squares.map((squaresRow, rowIndex) => {
    return (
      <div style={{ display: "flex" }} key={Math.random() * 100000}>
        {squaresRow.map((square, colIndex) => {
          return (
            <BoardSquare
              alive={square.alive}
              key={Math.random() * 100000}
              rowIndex={rowIndex}
              colIndex={colIndex}
              onClickSquare={onClickSquare}
            />
          );
        })}
      </div>
    );
  });
};

const GameOfLife = () => {
  const intervalId = useRef(null);
  const [isGameInProgress, setIsGameInProgress] = useState(false);
  const [time, setTime] = useState(() => 0);
  const [squares, setSquares] = useState(
    Array(40).fill(
      Array(40).fill({
        alive: false,
      })
    )
  );

  const onClickSquare = (rowIndex, colIndex) => {
    let copySquaresArray = JSON.parse(JSON.stringify(squares));
    let currSquare = copySquaresArray[rowIndex][colIndex];
    copySquaresArray[rowIndex][colIndex] = { alive: !currSquare.alive };
    setSquares(copySquaresArray);
  };

  const clearOutBoard = () => {
    setTime(0);
    setSquares(
      Array(40).fill(
        Array(40).fill({
          alive: false,
        })
      )
    );
  };

  const implementCustomPreset = () => {
    clearOutBoard();
  };

  const startGame = () => {
    setIsGameInProgress(true);
  };

  const stopGame = () => {
    setIsGameInProgress(false);
  };

  const getNeighbors = (rowIndex, colIndex) => {
    console.log("neighbors function");
    // upper row --> decrement row index
    let neighbors = [];

    if (rowIndex - 1 >= 0) {
      // we have a valid upper row
      const upperRowIndex = rowIndex - 1;

      // square right above curr square
      neighbors.push(squares[upperRowIndex][colIndex]);

      // square top of and left of curr square
      if (colIndex - 1 >= 0) {
        neighbors.push(squares[upperRowIndex][colIndex - 1]);
      }

      // square top of and right of curr square
      if (colIndex + 1 <= 39) {
        neighbors.push(squares[upperRowIndex][colIndex + 1]);
      }
    }

    if (rowIndex + 1 <= 39) {
      const lowerRowIndex = rowIndex + 1;

      // square right below curr square
      neighbors.push(squares[lowerRowIndex][colIndex]);

      // square below of and left of curr square
      if (colIndex - 1 >= 0) {
        neighbors.push(squares[lowerRowIndex][colIndex - 1]);
      }

      // square below of and right of curr square
      if (colIndex + 1 <= 39) {
        neighbors.push(squares[lowerRowIndex][colIndex + 1]);
      }
    }

    if (colIndex - 1 >= 0) {
      neighbors.push(squares[rowIndex][colIndex - 1]);
    }

    if (colIndex + 1 <= 39) {
      neighbors.push(squares[rowIndex][colIndex + 1]);
    }

    return neighbors;
  };

  const getCountOfAliveNeighbors = (neighbors) => {
    let aliveNieghborCount = 0;
    for (let neighbor of neighbors) {
      if (neighbor.alive) {
        aliveNieghborCount++;
      }
    }
    return aliveNieghborCount;
  };

  const clockTick = () => {
    // go over all of the squares x
    // if square is alive
    ////// check it's 8 neighbors
    ////// aliveNeighbors <= 1 ---> square dies
    ////// aliveNeighbors > 1 && aliveNeighbors <= 3 ---> square lives
    ////// aliveNeighbors > 3 ---> square dies
    // if square if dead
    /////// aliveNeighbors === 3 ---> square lives

    // function getAliveNeighbors() for each sqaure
    ////// getNeighbors() returns an array of bools

    console.log("in tick function", time);
    let copySquaresArray = JSON.parse(JSON.stringify(squares));
    for (let rowIndex = 0; rowIndex < 40; rowIndex++) {
      for (let colIndex = 0; colIndex < 40; colIndex++) {
        const currSquare = squares[rowIndex][colIndex];
        const neighbors = getNeighbors(rowIndex, colIndex);
        const aliveNeighbors = getCountOfAliveNeighbors(neighbors);
        let newSquareState;
        if (currSquare.alive) {
          if (aliveNeighbors <= 1) {
            newSquareState = false;
          } else if (aliveNeighbors > 1 && aliveNeighbors <= 3) {
            newSquareState = true;
          } else {
            newSquareState = false;
          }
        } else {
          if (aliveNeighbors === 3) {
            newSquareState = true;
          } else {
            newSquareState = false;
          }
        }
        copySquaresArray[rowIndex][colIndex] = { alive: newSquareState };
      }
    }
    setSquares(copySquaresArray);
  };

  useEffect(() => {
    if (isGameInProgress) {
      intervalId.current = setInterval(() => {
        setTime((currTime) => currTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId.current);
    }
  }, [isGameInProgress]);

  useEffect(() => {
    clockTick();
  }, [time]);

  return (
    <div>
      <div id="title">
        <h2>Conway's Game of Life</h2>
      </div>
      <div
        id="actionButtons"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div id="row1" style={{ display: "flex", justifyContent: "center" }}>
          <button>Preset 1</button>
          <button>Preset 2</button>
          <button>Preset 3</button>
          <button onClick={implementCustomPreset}>Custom Preset</button>
        </div>
        <div id="row1" style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={startGame}>Start</button>
          <button onClick={stopGame}>Stop</button>
          <button onClick={clearOutBoard}>Clear</button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h4>Lives: {}</h4>
        <h4>Time: {time}</h4>
      </div>
      <GameBoard squares={squares} onClickSquare={onClickSquare} />
    </div>
  );
};

export default GameOfLife;
