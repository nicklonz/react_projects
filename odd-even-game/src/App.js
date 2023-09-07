import React, { useState } from 'react';
import './App.css';

function App() {
  const [money, setMoney] = useState(100);
  const [choice, setChoice] = useState('odd');
  const [rounds, setRounds] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  const playGame = () => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const isOdd = randomNumber % 2 !== 0;
    const win = (choice === 'odd' && isOdd) || (choice === 'even' && !isOdd);
    let newMoney = win ? money + 1 : money - 1;

    setMoney(newMoney);
    setRounds([...rounds, { randomNumber, win }]);
    if (newMoney <= 0 || newMoney >= 200) {
      setGameOver(true);
    }
  };

  return (
    <div className="App">
      <h1>Odd or Even Game</h1>
      <h2>Money: ${money}</h2>
      <div>
        <label>
          Choose Odd or Even
          <select
            value={choice}
            onChange={(e) => setChoice(e.target.value)}
            disabled={gameOver}
          >
            <option value="odd">Odd</option>
            <option value="even">Even</option>
          </select>
        </label>
      </div>
      <button onClick={playGame} disabled={gameOver}>
        Play
      </button>
      {gameOver && <h2>Game Over!</h2>}
      <ul>
        {rounds.map((round, index) => (
          <li key={index}>
            Round {index + 1}: Random Number = {round.randomNumber},{' '}
            {round.win ? 'Win' : 'Lose'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
