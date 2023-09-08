import React, { useState } from "react";
import styled from "styled-components";
import { darken } from "polished";

const Container = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 20px;
  color: #333;
`;

const Balance = styled.p`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const BallButton = styled.button`
  background-color: ${(props) => props.color};
  color: #fff;
  font-size: 18px;
  margin: 0 10px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => darken(0.1, props.color)};
  }
`;

const Result = styled.p`
  font-size: 20px;
  margin-top: 20px;
  color: ${(props) => (props.win ? "green" : "red")};
`;

const BettingGame = () => {
  const [selectedBall, setSelectedBall] = useState("");
  const [balance, setBalance] = useState(1000);
  const [result, setResult] = useState("");
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [ballCounts, setBallCounts] = useState({
    red: 0,
    yellow: 0,
    blue: 0,
    green: 0,
    black: 0,
  });

  const handleBallSelection = (ball) => {
    setSelectedBall(ball);
  };

  const handleBet = () => {
    const winningBall = generateRandomBall();
    const betAmount = 100;

    if (selectedBall === winningBall) {
      setBalance(balance + betAmount * 3);
      setWins(wins + 1);
      setResult("You won!");
    } else {
      setBalance(balance - betAmount);
      setLosses(losses + 1);
      setResult("You lost!");
    }

    // Update ball counts
    setBallCounts((prevCounts) => ({
      ...prevCounts,
      [selectedBall]: prevCounts[selectedBall] + 1,
    }));
  };

  const generateRandomBall = () => {
    const balls = ["red", "yellow", "blue", "green", "black"];
    const randomIndex = Math.floor(Math.random() * balls.length);
    return balls[randomIndex];
  };

  return (
    <Container>
      <Title>Ball Betting Game</Title>
      <Balance>Balance: ${balance}</Balance>
      <ButtonContainer>
        {["red", "yellow", "blue", "green", "black"].map((color) => (
          <BallButton
            key={color}
            color={color}
            onClick={() => handleBallSelection(color)}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </BallButton>
        ))}
      </ButtonContainer>
      <button onClick={handleBet} style={{ fontSize: "24px", marginTop: "20px" }}>
        Place Bet
      </button>
      {selectedBall && (
        <Result win={result === "You won!"}>
          {result} - Selected Ball: {selectedBall}
        </Result>
      )}
      <div>
        {Object.keys(ballCounts).map((ballColor) => (
          <p key={ballColor}>
            {ballColor.charAt(0).toUpperCase() + ballColor.slice(1)}:{" "}
            {ballCounts[ballColor]}
          </p>
        ))}
      </div>
      <p>Wins: {wins}</p>
      <p>Losses: {losses}</p>
    </Container>
  );
};

export default BettingGame;
