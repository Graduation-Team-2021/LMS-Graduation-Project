import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Quiz from './Quiz/Quiz';
import { Prompt } from 'react-router'
import Countdown from "react-countdown";
import cls from "./Item.module.css";

function Page(props) {
  let ele = props.location.state.data;
  ////////////////////////////////////////////////////////
  const [timer, setTimer] = useState(null);
  const [clicked, setClicked] = useState({ clicked: false })
  const [finished, setFinished] = useState({ finished: false })
  const [score, setScore] = useState(0)
  ////////////////////////////////////////////////////////
  useEffect(() => {
    if (clicked.clicked && !finished.finished) {
      window.onbeforeunload = () => true
    } else {
      window.onbeforeunload = undefined
    }
  });
  ////////////////////////////////////////////////////////
  const onCompleteHandler = () => {
    setFinished({finished:true})
  }
  const onClickHandler = () => {
    if (!clicked.clicked) {
      setTimer(
        <Countdown
          className={cls.timer}
          date={
            Date.now() + ele.leeway.slice(0, ele.leeway.indexOf(" ")) * 60 * 1000
          }
          onComplete={onCompleteHandler}
        >
          <div className={cls.timer}>Time's up!</div>
        </Countdown>
      );
      setClicked({ clicked: true })
    }
  };
  ////////////////////////////////////////////////////////
  useEffect(()=>{
    if (finished.finished){
      //send student score to the database!!!!!
      // score is in score state
    }
  }, [finished])
  ////////////////////////////////////////////////////////
  return (
    <div className={cls.page}>
      <Prompt
        when={clicked.clicked && !finished.finished}
        message="You haven't finished yet, are you sure you want to leave?"
      />
      <button className={cls.button} onClick={() => props.history.push("/Deliv/")}>
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
        <button className={cls.button} onClick={onClickHandler}>
          <h2>
            <b>Begin!</b>
          </h2>
        </button>
        {timer}
      </div>
      {clicked.clicked?<Quiz fin={finished.finished} setFin = {setFinished} setSec={setScore} sec={score}/>:null}
    </div>
  );
}

export default withRouter(Page);
