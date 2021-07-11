import styled from "styled-components";
import { Button } from "./Button";
import React from "react";

const Title = styled.h1`
  margin-top: 4em;
  font-size: 48px;
`;

const Points = styled.p`
  font-size: 24px;
  margin-bottom: 3em;
`;

const GameOver = ({ pts }) => {
  return (
    <React.Fragment>
      <Title>Game Over</Title>
      <Points>You did {pts} out of 5!</Points>
    </React.Fragment>
  );
};

export default GameOver;
