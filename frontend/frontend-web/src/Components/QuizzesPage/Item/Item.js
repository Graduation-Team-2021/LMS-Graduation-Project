import React, { useState, useEffect, useRef } from "react";
import { withRouter } from "react-router-dom";
import Quiz from "./Quiz/Quiz";
import { Prompt } from "react-router";
import Countdown from "react-countdown";
import cls from "./Item.module.css";
import { SubmitQuiz } from "../../../Interface/Interface";
import { mapDispatchToProps, mapStateToProps } from "../../../store/reduxMaps";
import { connect } from "react-redux";

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
              (ele.leeway.slice(ele.leeway.indexOf(" ") + 1) === "Minutes"
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
      SubmitQuiz({
        exam_id: ele.id,
        student_id: props.userData.ID,
        mark: score,
        out_of_mark: ele.mark,
      }).then((res) => {
        //TODO: Show Submitted
        console.log("Submitted")
      });
    }
  }, [ele.id, ele.mark, finished, props.userData.ID, score]);
  ////////////////////////////////////////////////////////
  document.title=`${ele.name} Quiz`
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
          This is {ele.name} from "{ele.course}" course
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
          id={ele.id}
          fin={finished.finished}
          setFin={setFinished}
          setSec={setScore}
          sec={score}
        />
      ) : null}
    </div>
  );
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Page));
