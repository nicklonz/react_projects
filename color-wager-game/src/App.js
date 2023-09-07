import React, { useState } from "react";
import "./App.css";

function App() {
  const [balance, setBalance] = useState(100);
  const [wager, setWager] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleWagerChange = (e) => {
    setWager(Number(e.target.value));
  };

  const handlePlay = () => {
    if (wager > balance || wager <= 0) {
      alert("Invalid wager amount!");
      return;
    }

    const colors = ["Blue", "Red", "Green"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    if (randomColor === selectedColor) {
      setBalance(balance + wager * 2);
      setWins(wins + 1);
    } else {
      setBalance(balance - wager);
      setLosses(losses + 1);
    }

    setSelectedColor(null);
  };

  return (
    <div className="App">
      <h1>Color Wager Game</h1>
      <div>
        <h2>Balance: ${balance}</h2>
      </div>
      <div>
        <h2>Wins: {wins}</h2>
      </div>
      <div>
        <h2>Losses: {losses}</h2>
      </div>
      <div>
        <label>
          Wager Amount:
          <input
            type="number"
            value={wager}
            onChange={handleWagerChange}
          />
        </label>
      </div>
      <div>
        <button
          style={{ backgroundColor: selectedColor === "Blue" ? "lightblue" : "transparent" }}
          onClick={() => handleColorSelect("Blue")}
        >
          Blue
        </button>
        <button
          style={{ backgroundColor: selectedColor === "Red" ? "lightcoral" : "transparent" }}
          onClick={() => handleColorSelect("Red")}
        >
          Red
        </button>
        <button
          style={{ backgroundColor: selectedColor === "Green" ? "lightgreen" : "transparent" }}
          onClick={() => handleColorSelect("Green")}
        >
          Green
        </button>
      </div>
      <div>
        <button onClick={handlePlay}>Play</button>
      </div>
    </div>
  );
}

export default App;
