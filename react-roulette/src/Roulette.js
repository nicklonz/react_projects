import React, { useState } from 'react';

const Roulette = () => {
  const [number, setNumber] = useState(null);
  const [color, setColor] = useState(null);

  const spin = () => {
    const randomNumber = Math.floor(Math.random() * 37);
    setNumber(randomNumber);

    if (randomNumber === 0) {
      setColor('green');
    } else if (randomNumber % 2 === 0) {
      setColor('black');
    } else {
      setColor('red');
    }
  };

  return (
    <div>
      <button onClick={spin}>Spin</button>
      <div>
        {number !== null && (
          <div>
            <span>Number: {number}</span>
            <span>Color: {color}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Roulette;
