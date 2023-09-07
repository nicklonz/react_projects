import React, { useState } from 'react';
import './App.css';

function App() {
  const [userNumber, setUserNumber] = useState("");
  const [wager, setWager] = useState("");
  const [totalMoney, setTotalMoney] = useState(100);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const handleBet = () => {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    const wagerAmount = parseFloat(wager);

    if (!userNumber || isNaN(wagerAmount) || wagerAmount <= 0) {
      alert("Please enter a valid number and wager amount.");
      return;
    }

    if (wagerAmount > totalMoney) {
      alert("You don't have enough money to make that bet.");
      return;
    }

    if (parseInt(userNumber, 10) === randomNumber) {
      const winnings = wagerAmount * 7;
      setTotalMoney(totalMoney + winnings);
      setWins(wins + 1);
      alert(`Congratulations, the number was ${randomNumber}! You win ${winnings}!`);
    } else {
      setTotalMoney(totalMoney - wagerAmount);
      setLosses(losses + 1);
      alert(`Sorry, the number was ${randomNumber}. You lose ${wagerAmount}.`);
    }
  };

  return (
    <div className="App">
      <h1>Betting Game</h1>
      <p>Choose a number between 1 and 10:</p>
      <input
        type="number"
        value={userNumber}
        onChange={e => setUserNumber(e.target.value)}
        min="1"
        max="10"
      />
      <p>Enter your wager:</p>
      <input
        type="number"
        value={wager}
        onChange={e => setWager(e.target.value)}
        min="1"
      />
      <button onClick={handleBet}>Place Bet</button>
      <h2>Statistics:</h2>
      <p>Total Money: ${totalMoney}</p>
      <p>Wins: {wins}</p>
      <p>Losses: {losses}</p>
    </div>
  );
}

export default App;
