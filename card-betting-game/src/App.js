import React, { useState } from "react";
import "./App.css";

function App() {
  const [deck, setDeck] = useState(createDeck());
  const [wager, setWager] = useState(0);
  const [money, setMoney] = useState(100);
  const [message, setMessage] = useState("");
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  function createDeck() {
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
    const values = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
      "Ace",
    ];

    let deck = [];

    for (let suit of suits) {
      for (let value of values) {
        deck.push({ value, suit });
      }
    }

    return shuffleDeck(deck);
  }

  function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  const handleBet = (chosenSuit) => {
    if (deck.length <= 13) {
      setMessage("Game Over!");
      return;
    }

    if (wager <= 0 || wager > money) {
      setMessage("Invalid wager amount");
      return;
    }

    const card = deck.pop();
    setDeck(deck);

    if (card.suit === chosenSuit) {
      setMoney(money + wager * 3);
      setWins(wins + 1);
      setMessage(`You win! Drew ${card.value} of ${card.suit}`);
    } else {
      setMoney(money - wager);
      setLosses(losses + 1);
      setMessage(`You lose! Drew ${card.value} of ${card.suit}`);
    }
  };

  return (
    <div className="App">
      <h1>Card Betting Game</h1>
      <h2>Remaining cards: {deck.length}</h2>
      <h2>Money: ${money}</h2>
      <h2>Wins: {wins} | Losses: {losses}</h2>
      <input
        type="number"
        value={wager}
        onChange={(e) => setWager(parseInt(e.target.value, 10))}
      />
      <button onClick={() => handleBet("Hearts")}>Bet on Hearts</button>
      <button onClick={() => handleBet("Diamonds")}>Bet on Diamonds</button>
      <button onClick={() => handleBet("Clubs")}>Bet on Clubs</button>
      <button onClick={() => handleBet("Spades")}>Bet on Spades</button>
      <h3>{message}</h3>
    </div>
  );
}

export default App;
