import React, { useEffect, useState } from "react";

const Square = ({
  id,
  mineNeighbors,
  isMine,
  hasBeenClicked,
  handleSquareClick,
  colIndex,
  rowIndex,
}) => {
  let background = null;
  if (isMine) {
    background = "orange";
  }
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        border: ".5px solid white",
        background: `${hasBeenClicked && background}`,
      }}
      onClick={() => handleSquareClick(rowIndex, colIndex)}
    >
      {hasBeenClicked && (isMine ? "X" : mineNeighbors)}
    </div>
  );
};

const Grid = ({ grid, handleSquareClick }) => {
  return (
    <>
      {grid.map((gridRow, rowIndex) => {
        return (
          <div
            style={{ display: "flex", flexDirection: "row" }}
            key={Math.random() * 10000}
          >
            {gridRow.map((square, colIndex) => {
              return (
                <Square
                  key={square.id}
                  isMine={square.isMine}
                  mineNeighbors={square.mineNeighbors}
                  hasBeenClicked={square.hasBeenClicked}
                  handleSquareClick={handleSquareClick}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                />
              );
            })}
          </div>
        );
      })}
    </>
  );
};

const Minesweeper = () => {
  const [grid, setGrid] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const setUpGridAndMines = () => {
    let grid = [];
    for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
      let gridRow = [];
      for (let colIndex = 0; colIndex < 10; colIndex++) {
        let singleSquare = {
          isMine: false,
          mineNeighbors: 0,
          id: Math.random() * 100000,
          hasBeenClicked: false,
        };
        const coinFlip = Math.floor(Math.random() * 100) % 5 === 0;
        if (coinFlip) {
          singleSquare.isMine = true;
        }
        gridRow.push(singleSquare);
      }
      grid.push(gridRow);
    }
    setGrid(grid);
    return Promise.resolve(grid);
  };

  const getNeighbors = (rowIndex, colIndex, gridCopy) => {
    let neighbors = [];

    // top row
    if (rowIndex - 1 >= 0) {
      // check the top row
      const topRowIndex = rowIndex - 1;
      // top left
      if (colIndex - 1 >= 0) {
        neighbors.push(gridCopy[topRowIndex][colIndex - 1]);
      }

      // square directly above
      neighbors.push(gridCopy[topRowIndex][colIndex]);

      // top right
      if (colIndex + 1 < 10) {
        neighbors.push(gridCopy[topRowIndex][colIndex + 1]);
      }
    }

    // square to the left
    if (colIndex - 1 >= 0) {
      neighbors.push(gridCopy[rowIndex][colIndex - 1]);
    }

    // square to the right
    if (colIndex + 1 < 10) {
      neighbors.push(gridCopy[rowIndex][colIndex + 1]);
    }

    // bottom row

    if (rowIndex + 1 < 10) {
      const bottomRowIndex = rowIndex + 1;

      // square directly below
      neighbors.push(gridCopy[bottomRowIndex][colIndex]);

      // bottom left
      if (colIndex - 1 >= 0) {
        neighbors.push(gridCopy[bottomRowIndex][colIndex - 1]);
      }

      // bottom right
      if (colIndex + 1 < 10) {
        neighbors.push(gridCopy[bottomRowIndex][colIndex + 1]);
      }
    }
    return neighbors;
  };

  const locateMineNeighbors = (grid) => {
    let gridCopy = JSON.parse(JSON.stringify(grid));
    for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
      for (let colIndex = 0; colIndex < 10; colIndex++) {
        let currSquare = gridCopy[rowIndex][colIndex];
        if (!currSquare.isMine) {
          const neighbors = getNeighbors(rowIndex, colIndex, gridCopy);
          const numOfMineNeighbors = neighbors.filter((x) => x.isMine);
          currSquare.mineNeighbors = numOfMineNeighbors.length;
        }
      }
    }
    setGrid(gridCopy);
    return gridCopy;
  };

  const initializeGame = () => {
    setUpGridAndMines().then((grid) => {
      locateMineNeighbors(grid);
    });
  };

  const handleSquareClick = (rowIndex, colIndex) => {
    if (!isGameOver) {
      const currSquare = grid[rowIndex][colIndex];
      if (!currSquare.hasBeenClicked) {
        let gridCopy = JSON.parse(JSON.stringify(grid));
        let currSquareCopy = gridCopy[rowIndex][colIndex];
        currSquareCopy.hasBeenClicked = true;
        setGrid(gridCopy);
        if (currSquareCopy.isMine) {
          setIsGameOver(true);
        }
      }
    }
  };

  const handleResetGame = () => {
    initializeGame();
    setIsGameOver(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div>
      <h2>Minesweeper</h2>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "space-evenly",
        }}
      >
        <button onClick={handleResetGame}>Reset</button>
      </div>

      <div style={{ margin: "10px" }}>
        {grid && <Grid grid={grid} handleSquareClick={handleSquareClick} />}
      </div>

      {isGameOver && <div>Game Over!</div>}
    </div>
  );
};

export default Minesweeper;
