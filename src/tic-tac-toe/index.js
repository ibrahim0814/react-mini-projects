import React, { useState } from "react";

const Tile = ({ input, id, handleTileClick }) => {
  return (
    <div
      onClick={() => handleTileClick(id)}
      style={{ width: "50px", height: "50px", border: "1px solid white" }}
    >
      {input}
    </div>
  );
};

const TicTacToe = () => {
  const [nextPlayer, setNextPlayer] = useState("X");
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  const [moves, setMoves] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const handleTileClick = (id) => {
    const row = id[0];
    const col = id[1];

    if (moves[row][col] === null && !gameOver) {
      let copyMoves = [...moves];
      copyMoves[row][col] = nextPlayer;
      setMoves(copyMoves);
      setNextPlayer((currPlayer) => {
        if (currPlayer === "X") {
          return "O";
        } else {
          return "X";
        }
      });
      const winner = isGameOver(copyMoves);
      if (winner) {
        setWinner(winner);
        setGameOver(true);
      }
    }
  };

  const winningCombos = [
    // winning rows
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // winning columns
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // winning diagonals
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [2, 0],
      [1, 1],
      [0, 2],
    ],
  ];

  const isGameOver = (newMovesArr) => {
    let result = null;
    winningCombos.forEach((winningCombo) => {
      const index1 = winningCombo[0];
      const index2 = winningCombo[1];
      const index3 = winningCombo[2];

      if (
        newMovesArr[index1[0]][index1[1]] ===
          newMovesArr[index2[0]][index2[1]] &&
        newMovesArr[index1[0]][index1[1]] === newMovesArr[index3[0]][index3[1]]
      ) {
        result = newMovesArr[index1[0]][index1[1]];
        return;
      }
    });
    return result;
  };

  return (
    <>
      {!gameOver && <h2>Next Player: {nextPlayer}</h2>}
      {gameOver && <h2>Winner: {winner}</h2>}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div id="row1" style={{ display: "flex", flexDirection: "row" }}>
          <Tile
            input={moves[0][0]}
            id={[0, 0]}
            handleTileClick={handleTileClick}
          />
          <Tile
            input={moves[0][1]}
            id={[0, 1]}
            handleTileClick={handleTileClick}
          />
          <Tile
            input={moves[0][2]}
            id={[0, 2]}
            handleTileClick={handleTileClick}
          />
        </div>
        <div id="row2" style={{ display: "flex", flexDirection: "row" }}>
          <Tile
            input={moves[1][0]}
            id={[1, 0]}
            handleTileClick={handleTileClick}
          />
          <Tile
            input={moves[1][1]}
            id={[1, 1]}
            handleTileClick={handleTileClick}
          />
          <Tile
            input={moves[1][2]}
            id={[1, 2]}
            handleTileClick={handleTileClick}
          />
        </div>
        <div id="row3" style={{ display: "flex", flexDirection: "row" }}>
          <Tile
            input={moves[2][0]}
            id={[2, 0]}
            handleTileClick={handleTileClick}
          />
          <Tile
            input={moves[2][1]}
            id={[2, 1]}
            handleTileClick={handleTileClick}
          />
          <Tile
            input={moves[2][2]}
            id={[2, 2]}
            handleTileClick={handleTileClick}
          />
        </div>
      </div>
    </>
  );
};

export default TicTacToe;
