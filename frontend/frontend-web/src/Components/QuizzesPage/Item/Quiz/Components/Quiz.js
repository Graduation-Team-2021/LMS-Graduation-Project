import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "./Button";
import GameOver from "./GameOver";
import classes from "./Quiz.module.css"

const QuizWindow = styled.div`
    align-content: center;
    text-align: center;
    font-size: clamp(20px, 2.5vw, 24px);
    margin-top: 20px;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 2em auto;
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
        //TODO: Load EXAM Data HERE
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
    const [userAnswers, setAnswers] = useState({});
    let element = document.createElement('div');
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

    const changeQuestion = (num) => {
        setNumber(num);
    }

    const Finish = () => {
        setNumber(number + 1);
        let pts = 0;
        let temp = '';
        quiz.forEach((x, i) => {
            temp = decodeHTMLEntities(x.answer);
            if (temp === userAnswers[i]) { pts++; }
        })
        props.setScore(pts)
        props.setFinished({ finished: true })
    }

    const decodeHTMLEntities = (str) => {
        if (str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }
        return str;
    }

    ///////////////////////////////////////////////////////
    const Buttons = quiz.map((value, index) => {
        return (
            <Button
                key={index}
                className={index===number?classes.Active:(userAnswers[index]?classes.Done:classes.Circle)}
                onClick={() => changeQuestion(index)}
            >
                {index + 1}
            </Button>
        );
    });
    //////////////////////////////////////////////////////

    return (
        <QuizWindow>
            {quiz[number] &&
                <div>
                    <Question dangerouslySetInnerHTML={{ __html: quiz[number].question }}></Question>
                    <Options>
                        {
                            quiz[number].options.map((item, index) => (
                                <button key={index}
                                    className={classes.Question}
                                    dangerouslySetInnerHTML={{ __html: item }}
                                    onClick={pickAnswer}
                                    style={{backgroundColor: decodeHTMLEntities(item) === userAnswers[number] ? '#616A94' : '#161A31'}} />
                            ))}
                        <div className={classes.Guidance}>{Buttons}</div>
                    </Options>
                </div>
            }
            {
                (number === quiz.length && number > 0) && <div>
                    <Button onClick={Finish} css={btnCSS}>Finish</Button>
                    <div className={classes.Guidance}>{Buttons}</div>
                </div>
            }
            {
                number === quiz.length + 1 && <GameOver pts={props.score} user={userAnswers} data={quiz} />
            }
        </QuizWindow>
    )
}

export default Quiz;
