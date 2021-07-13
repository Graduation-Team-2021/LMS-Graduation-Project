import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import Quiz from "./Quiz/Quiz";
import { Prompt } from "react-router";
import Countdown from "react-countdown";
import cls from "./Item.module.css";

function Page(props) {
  let ele = props.location.state.data;
  const clockRef = useRef();
  ////////////////////////////////////////////////////////
  const [timer, setTimer] = useState(null);
  const [clicked, setClicked] = useState({ clicked: false });
  const [finished, setFinished] = useState({ finished: false });
  const [score, setScore] = useState(0);
  ////////////////////////////////////////////////////////
  useEffect(() => {
    if (clicked.clicked && !finished.finished) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = undefined;
    }
  });
  ////////////////////////////////////////////////////////
  const onCompleteHandler = () => {
    setFinished({ finished: true });
  };
  const onClickHandler = () => {
    if (!clicked.clicked) {
      setTimer(
        <Countdown
          className={cls.timer}
          date={
            Date.now() +
            ele.leeway.slice(0, ele.leeway.indexOf(" ")) *
              60 *
              1000 *
              (ele.leeway.slice(1, ele.leeway.indexOf(" ")) === "Minutes"
                ? 1
                : 60)
          }
          onComplete={onCompleteHandler}
          ref={clockRef}
        >
          <div className={cls.timer}>Time's up!</div>
        </Countdown>
      );
      setClicked({ clicked: true });
    }
  };
  ////////////////////////////////////////////////////////
  useEffect(() => {
    if (finished.finished) {
      clockRef.current.stop();
      //TODO: send student score to the database!!!!!
      // score is in score state
      //TODO: Switch state to completed
    }
  }, [finished]);
  ////////////////////////////////////////////////////////
  return (
    <div className={cls.page}>
      <Prompt
        when={clicked.clicked && !finished.finished}
        message="You haven't finished yet, are you sure you want to leave?"
      />
      <button className={cls.button} onClick={() => props.history.goBack()}>
        <h2>
          <b>Go Back...</b>
        </h2>
      </button>
      <div>
        <h1>
          {" "}
          This is "{ele.name}" {ele.type} from "{ele.course}" course
        </h1>
        <h2>
          <b>Allowed time: {ele.leeway}</b>
        </h2>
        {finished.finished ? null : (
          <button className={cls.button} onClick={onClickHandler}>
            <h2>
              <b>Begin!</b>
            </h2>
          </button>
        )}
        {timer}
      </div>
      {clicked.clicked ? (
        <Quiz
          id ={ele.id}
          fin={finished.finished}
          setFin={setFinished}
          setSec={setScore}
          sec={score}
        />
      ) : null}
    </div>
  );
}

export default withRouter(Page);
