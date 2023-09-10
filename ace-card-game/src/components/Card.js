// src/components/Card.js

import React from 'react';
import '../styles/Card.css';

function Card({ card, index, selectCard }) {
  return (
    <div className="card" onClick={() => selectCard(index)}>
      <span>{card.show ? card.value : index + 1}</span>
    </div>
  );
}

export default Card;
