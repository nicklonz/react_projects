// src/components/Board.js

import React, { useState } from 'react';
import Card from './Card';
import '../styles/Board.css';


function Board() {
  const [cards, setCards] = useState(generateCards());
  const [selectedCard, setSelectedCard] = useState(null);
  const [wager, setWager] = useState(0);
  const [balance, setBalance] = useState(1000);

  function generateCards() {
    const positions = ['A', 'X', 'X'];
    return positions.sort(() => 0.5 - Math.random());
  }

  function selectCard(index) {
    setSelectedCard(index);
  }

  function revealAce() {
    if (selectedCard === null) return;

    if (cards[selectedCard] === 'A') {
      setBalance(balance + wager);
    } else {
      setBalance(balance - wager);
    }

    setCards(cards.map((card, i) => ({ value: card, show: true })));
  }

  return (
    <div className="board">
      {cards.map((card, index) => (
        <Card key={index} card={card} index={index} selectCard={selectCard} />
      ))}
      <div className="controls">
        <input 
          type="number" 
          value={wager} 
          onChange={e => setWager(Math.min(e.target.value, balance))} 
        />
        <button onClick={revealAce}>Show Ace!</button>
      </div>
      <div className="balance">Balance: ${balance}</div>
    </div>
  );
}

export default Board;
