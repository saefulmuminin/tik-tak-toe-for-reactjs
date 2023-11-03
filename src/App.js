import React, { useState } from "react";
import StartScreen from "../src/components/StartScreen";
import backgroundImage from "./asset/beaground.jpg";
function Square({ value, onClick, isWinnerSquare }) {
  return (
    <button
      className={`w-20 h-20 md:w-36 md:h-36 backdrop-blur-md bg-white/30 text-blue-500 font-bold text-2xl md:text-5xl rounded-lg 
        ${
          isWinnerSquare ? "border-b-4 border-y-emerald-950-600" : "border none"
        } transform hover:scale-110 transition-transform`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

// ...

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);
  const winnerMessage = winner
    ? `${winner.winner} Menang!`
    : "Tidak ada yang menang!";
  function restart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }
  function selectSquare(square) {
    if (winner || squares[square]) {
      return;
    }

    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);
    setXIsNext(!xIsNext);
  }

  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => selectSquare(i)}
        isWinnerSquare={winner && winner.line.includes(i)}
      />
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 class="block bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text font-sans text-5xl font-bold leading-tight tracking-normal text-transparent antialiased">
        TIC-TAK-TOE GAME FOR React
      </h1>
      <div className="mb-4 text-2xl font-bold">{status}</div>
      <div className="grid grid-cols-3 gap-4">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      <button
        className="px-4 py-2 mt-10 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none md:w-40"
        onClick={restart}
      >
        Restart
      </button>
    </div>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner.winner}`
    : squares.every(Boolean)
    ? `TIDAK ADA YANG MENANG!!`
    : `player: ${nextValue}`;
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: [a, b, c],
      };
    }
  }

  return null;
}

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  function handleStartGame() {
    setIsGameStarted(true);
  }

  return (
    <div
      className="min-h-screen text-center bg-center bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {isGameStarted ? (
        <Board />
      ) : (
        <StartScreen onStartGame={handleStartGame} />
      )}
    </div>
  );
}

export default App;
