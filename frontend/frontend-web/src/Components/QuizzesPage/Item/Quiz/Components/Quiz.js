import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import Button from "./Button";
import GameOver from "./GameOver";
import classes from "./Quiz.module.css"
import { getQuizByID } from "../../../../../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../../../../../store/reduxMaps";
import { connect } from "react-redux";

const QuizWindow = styled.div`
    align-content: center;
    text-align: center;
    font-size: clamp(20px, 2.5vw, 24px);
    margin-top: 20px;
    width: 100%
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
        getQuizByID(props.id, props.userData.ID).then((res)=>{
            
        })
        axios.get('https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple')
            .then(res => {
                setQuiz(res.data.results.map(item => (
                    {
                        question: item.question,
                        options: shuffle([...item.incorrect_answers, item.correct_answer]),
                        answer: [item.correct_answer, item.incorrect_answers[0]]
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
        let temp = { ...userAnswers };
        if (quiz[number].answer.length === 1) {
            let t2 = [userAnswer];
            temp[number] = t2;
            setAnswers(temp);
            setNumber(number + 1);
        }
        else {
            let t2;
            if (temp[number] === undefined) {
                t2 = [userAnswer]
            }
            else {
                t2 = [...temp[number], userAnswer]
            }
            temp[number] = t2;
            setAnswers(temp);
        }
    }

    const changeQuestion = (num) => {
        setNumber(num);
    }

    const Next = () => {
        setNumber(number + 1);
    }

    const Finish = () => {
        setNumber(quiz.length + 1);
        let pts = 0;
        let temp = '';
        quiz.forEach((x, i) => {
            if (x.answer.length === 1) {
                temp = decodeHTMLEntities(x.answer.toString());
                if (temp === userAnswers[i][0]) { pts++; }
            }
            else {
                console.log(x.answer, userAnswers[i])
                userAnswers[i].forEach((y) => {
                    if (x.answer.includes(y)) { pts++; }
                })
            }
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
                className={index === number ? classes.Active : (userAnswers[index] ? classes.Done : classes.Circle)}
                onClick={() => changeQuestion(index)}
            >
                {index + 1}
            </Button>
        );
    });
    //////////////////////////////////////////////////////
    let totalScore = 0;
    quiz.forEach((x) => {
        totalScore += x.answer.length;
    })
    //////////////////////////////////////////////////////

    return (
        <QuizWindow>
            {number < quiz.length &&
                <div>
                    <Question dangerouslySetInnerHTML={{ __html: quiz[number].question }}></Question>
                    <Options>
                        <Question>{quiz[number].answer.length === 1 ? null : `Choose ${quiz[number].answer.length} answers`}</Question>
                        {
                            quiz[number].options.map((item, index) => (
                                <button key={index}
                                    className={classes.Question}
                                    dangerouslySetInnerHTML={{ __html: item }}
                                    onClick={pickAnswer}
                                    style={{
                                        backgroundColor: (userAnswers[number] != undefined) ?
                                            userAnswers[number].includes(decodeHTMLEntities(item)) ? '#616A94' : '#161A31' : '#161A31'
                                    }} />
                            ))}
                    </Options>
                </div>
            }
            {number < quiz.length + 1 &&
                <div>
                    <div className={classes.Guidance}>{Buttons}</div>
                    {
                        number < quiz.length ?
                            <Button onClick={Next} css={btnCSS}>Next</Button> :
                            <Button onClick={Finish} css={btnCSS}>Submit</Button>
                    }
                </div>
            }
            {
                number === quiz.length + 1 && <GameOver pts={props.score} user={userAnswers} data={quiz} totalScore={totalScore} />
            }
        </QuizWindow>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
