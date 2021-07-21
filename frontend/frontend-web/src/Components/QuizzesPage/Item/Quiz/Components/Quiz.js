import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import GameOver from "./GameOver";
import classes from "./Quiz.module.css";
import { getQuizByID } from "../../../../../Interface/Interface";
import {
  mapDispatchToProps,
  mapStateToProps,
} from "../../../../../store/reduxMaps";
import { connect } from "react-redux";
import { useCallback } from "react";

const QuizWindow = styled.div`
  align-content: center;
  text-align: center;
  font-size: clamp(20px, 2.5vw, 24px);
  margin-top: 20px;
  width: 100%;
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
  const [quiz, setQuiz] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setAnswers] = useState({});
  let element = document.createElement("div");
  ////////////////////////////////////////////////////////////////
  const decodeHTMLEntities = useCallback(
    (str) => {
      if (str && typeof str === "string") {
        // strip script/html tags
        str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, "");
        str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, "");
        element.innerHTML = str;
        str = element.textContent;
        element.textContent = "";
      }
      return str;
    },
    [element]
  );

  const Finish = useCallback(() => {
    setNumber(quiz.length + 1);
    let pts = 0;
    let temp = "";
    quiz.forEach((x, i) => {
      if (userAnswers[i] === undefined) {
        return;
      }
      if (x.answer.length === 1) {
        temp = decodeHTMLEntities(x.answer.toString());
        if (temp === userAnswers[i][0]) {
          pts += x.score;
        }
      } else {
        var counter = 0;
        userAnswers[i].forEach((y) => {
          if (x.answer.includes(y)) {
            counter++;
          }
          else{
            counter--;
          }
        });
        const ratio = counter / x.answer.length;
        pts += x.score * ratio;
      }
    });
    props.setScore(pts);
    props.setFinished({ finished: true });
  }, [decodeHTMLEntities, props, quiz, userAnswers]);
  ////////////////////////////////////////////////////////////////
  useEffect(() => {
    //TODO: Load EXAM Data HERE
    getQuizByID(props.id, props.userData.ID).then((res) => {
      const t = [];
      res.forEach((element) => {
        const ra = [];
        for (let index = 0; index < element.answers.length; index++) {
          if (element.answers[index].right_answer) {
            ra.push(element.answers[index].answers);
          }
        }
        const q = {
          question: element.question,
          options: shuffle([...element.answers.map((value) => value.answers)]),
          answer: ra,
          score: element.mark,
        };
        t.push(q);
      });
      setQuiz(t);
    });
    /* axios
      .get(
        "https://opentdb.com/api.php?amount=5&category=18&difficulty=easy&type=multiple"
      )
      .then((res) => {
        setQuiz(
          res.data.results.map((item) => ({
            question: item.question,
            options: shuffle([...item.incorrect_answers, item.correct_answer]),
            answer: [item.correct_answer, item.incorrect_answers[0]],
          }))
        );
      })
      .catch((err) => console.error(err)); */
  }, [props.id, props.userData.ID]);

  useEffect(() => {
    if (props.finished && number <= quiz.length) {
      Finish();
      setNumber(quiz.length + 1);
      //also, we need to send the answers to the database
    }
  }, [Finish, number, props.finished, quiz.length]);
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
      setNumber(number);
    } else {
      let t2;
      if (temp[number] === undefined) {
        t2 = [userAnswer];
      } else {
        t2 = [...temp[number]];
        if (t2.includes(userAnswer)) {
          const pos = t2.findIndex((value) => value === userAnswer);
          t2.splice(pos, 1);
        } else {
          t2.push(userAnswer);
        }
      }
      temp[number] = t2;
      setAnswers(temp);
    }
  };

  const changeQuestion = (num) => {
    setNumber(num);
  };

  const Next = () => {
    setNumber(number + 1);
  };

  const Buttons = quiz.map((value, index) => {
    return (
      <Button
        key={index}
        className={
          index === number
            ? classes.Active
            : userAnswers[index]
            ? classes.Done
            : classes.Circle
        }
        onClick={() => changeQuestion(index)}
      >
        {index + 1}
      </Button>
    );
  });
  //////////////////////////////////////////////////////
  let totalScore = 0;
  quiz.forEach((x) => {
    totalScore += x.score;
  });
  //////////////////////////////////////////////////////

  return (
    <QuizWindow>
      {number < quiz.length && (
        <div>
          <Question
            dangerouslySetInnerHTML={{ __html: quiz[number].question }}
          ></Question>
          <Options>
            <Question>
              {quiz[number].answer.length === 1
                ? null
                : `Choose ${quiz[number].answer.length} answers`}
            </Question>
            {quiz[number].options.map((item, index) => (
              <button
                key={index}
                className={classes.Question}
                dangerouslySetInnerHTML={{ __html: item }}
                onClick={pickAnswer}
                style={{
                  backgroundColor:
                    userAnswers[number] !== undefined
                      ? userAnswers[number].includes(decodeHTMLEntities(item))
                        ? "#616A94"
                        : "#161A31"
                      : "#161A31",
                }}
              />
            ))}
          </Options>
        </div>
      )}
      {number < quiz.length + 1 && (
        <div>
          <div className={classes.Guidance}>{Buttons}</div>
          {number < quiz.length ? (
            <Button onClick={Next} css={btnCSS}>
              Next
            </Button>
          ) : (
            <Button onClick={Finish} css={btnCSS}>
              Submit
            </Button>
          )}
        </div>
      )}
      {number === quiz.length + 1 && (
        <GameOver
          pts={props.score}
          user={userAnswers}
          data={quiz}
          totalScore={totalScore}
        />
      )}
    </QuizWindow>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
