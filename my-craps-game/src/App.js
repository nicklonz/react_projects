import React, { useState } from 'react';

// Helper function to generate a random dice roll
const rollDice = () => Math.floor(Math.random() * 6) + 1;

// Main App component
function App() {
  const [dice1, setDice1] = useState(rollDice());
  const [dice2, setDice2] = useState(rollDice());
  const [point, setPoint] = useState(null);
  const [message, setMessage] = useState('Press "Roll" to start!');

  const handleRoll = () => {
    const newDice1 = rollDice();
    const newDice2 = rollDice();
    setDice1(newDice1);
    setDice2(newDice2);
    
    const sum = newDice1 + newDice2;

    // First roll of the game
    if (point === null) {
      if (sum === 7 || sum === 11) {
        setMessage('You win!');
        setPoint(null);
      } else if (sum === 2 || sum === 3 || sum === 12) {
        setMessage('You lose!');
        setPoint(null);
      } else {
        setMessage(`Point is ${sum}`);
        setPoint(sum);
      }
    } else {
      // Subsequent rolls
      if (sum === point) {
        setMessage('You win!');
        setPoint(null);
      } else if (sum === 7) {
        setMessage('You lose!');
        setPoint(null);
      } else {
        setMessage(`Point is still ${point}`);
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Craps Game</h1>
      <h2>Dice 1: {dice1}</h2>
      <h2>Dice 2: {dice2}</h2>
      <h2>Sum: {dice1 + dice2}</h2>
      <button onClick={handleRoll}>Roll</button>
      <h2>{message}</h2>
      {point && <h2>Point is: {point}</h2>}
    </div>
  );
}

export default App;
