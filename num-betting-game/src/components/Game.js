// src/components/Game.js

import React, { useState } from 'react';

const Game = () => {
  const [bet, setBet] = useState(null);
  const [result, setResult] = useState([]);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const handleBet = (num) => {
    const selections = Array.from({ length: 3 }, () => Math.floor(Math.random() * 3) + 1);
    const total = selections.reduce((acc, curr) => acc + curr, 0);
    const won = num === total;

    if (won) {
      setWins(wins + 1);
    } else {
      setLosses(losses + 1);
    }

    setResult({
      selections,
      total,
      won
    });
  };

  return (
    <div className="game">
      <h2>Bet on Total (5 to 1 odds)</h2>
      <div className="options">
        {[3, 4, 5, 6, 7, 8, 9].map(num => (
          <button key={num} onClick={() => handleBet(num)}>{num}</button>
        ))}
      </div>
      <div className="results">
        {result.selections && (
          <>
            <p>Numbers drawn: {result.selections.join(', ')}</p>
            <p>Total: {result.total}</p>
            <p>{result.won ? 'You won!' : 'You lost!'}</p>
          </>
        )}
        <p>Wins: {wins}</p>
        <p>Losses: {losses}</p>
      </div>
    </div>
  );
};

export default Game;
