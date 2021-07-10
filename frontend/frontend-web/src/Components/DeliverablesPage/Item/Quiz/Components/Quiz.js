import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Button from './Button'
import GameOver from './GameOver';

const QuizWindow = styled.div`
    text-align: center;
    font-size: clamp(20px, 2.5vw, 24px);
    margin-top: 10vh;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: 2em auto;
    @media screen and (min-width: 1180px) {
        width: 50%;
    }
`;

const Option = styled.button`
    display: block;
    border: 1px solid #616A94;
    border-radius: 15px;
    padding: 15px 30px;
    text-decoration: none;
    color: white;
    background-color: ${props => props.color};
    transition: 0.3s;
    font-size: 1em;
    outline: none;
    user-select: none;
    margin-top: 1em;
    cursor: pointer;
    &:hover {
        color: white;
        background-color: #616A94;
    }
    
`;

const Question = styled.div`
    width: 80%;
    margin: 0 auto;
`;

const btnCSS = `
    margin-top: 2em;
`;

const Quiz = (props) => {
    useEffect(() => {

        axios.get('https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple')
            .then(res => {
                setQuiz(res.data.results.map(item => (

                    {
                        question: item.question,
                        options: shuffle([...item.incorrect_answers, item.correct_answer]),
                        answer: item.correct_answer
                    }

                )));
            })
            .catch(err => console.error(err))

    }, []);

    useEffect(() => {
        if (props.finished && number <= quiz.length) {
            Finish();
            setNumber(quiz.length + 1)
            //also, we need to send the answers to the database
        }
    }, [props.finished])

    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////

    const [quiz, setQuiz] = useState([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setAnswers] = useState({ 0: 'hi' });

    ////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////
    const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

    const pickAnswer = (e) => {
        let userAnswer = e.target.outerText;
        let temp = userAnswers;
        temp[number] = userAnswer;
        setAnswers(temp);
        setNumber(number + 1);
    }

    const goBack = () => {
        if (number)
            setNumber(number - 1);
    }

    const Finish = () => {
        setNumber(number + 1);
        let pts = 0;
        quiz.forEach((x, i) => {
            console.log(x.answer, userAnswers[i])
            if (x.answer === userAnswers[i]) { pts++; }
        })
        props.setScore(pts)
        props.setFinished({ finished: true })
    }

    ///////////////////////////////////////////////////////
    //////////////////////////////////////////////////////

    return (
        <QuizWindow>
            {quiz[number] &&
                <>
                    <Question dangerouslySetInnerHTML={{ __html: quiz[number].question }}></Question>
                    <Options>
                        {number ? <Button onClick={goBack} css={btnCSS}>Go back</Button> : null}
                        {
                            quiz[number].options.map((item, index) => (
                                <Option key={index}
                                    dangerouslySetInnerHTML={{ __html: item }}
                                    onClick={pickAnswer}
                                    color={item === userAnswers[number] ? '#616A94' : '#161A31'} />
                            ))}
                    </Options>
                </>
            }
            {
                (number === quiz.length && number > 0) && <>
                    <Button onClick={goBack} css={btnCSS}>Go back</Button>
                    <Button onClick={Finish} css={btnCSS}>Finish</Button>
                </>
            }
            {
                number === quiz.length + 1 && <GameOver pts={props.score} user={userAnswers} data={quiz}/>
            }
        </QuizWindow>
    )
}

export default Quiz;