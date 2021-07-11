import styled from 'styled-components'
import React from 'react'

const Title = styled.h1`
  margin-top: 4em;
  font-size: 48px;
`;

const Points = styled.p`
  font-size: 24px;
  margin-bottom: 3em;
`;

const Dovy = styled.div`
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
`;

const GameOver = (props) => {
    return (
        <Dovy>
            <Title>Game Over</Title>
            <Points>You did {props.pts} out of 5!</Points>
            <h3>Summary:</h3>
            {
                props.data.map((item, index) => (
                    <Dovy key={index}>
                        Question {index+1}: <Dovy dangerouslySetInnerHTML={{ __html: item.question }}/>
                        Your answer: <Dovy dangerouslySetInnerHTML={{ __html: props.user[index] }}/>
                        Correct Answer: <Dovy dangerouslySetInnerHTML={{ __html: item.answer }}/>
                    </Dovy>
                ))}
        </Dovy>
    )
}

export default GameOver;
