import React, { useState } from 'react'
import cls from './Quiz.module.css'
import Start from './Components/Start'
import Quiz from './Components/Quiz'

function QuizContainer(props) {

  const [start, setStart] = useState(true);

  return (
    <div className={cls.Quiz}>
    {console.log(props)}
      { start ? <Quiz finished={props.fin} setFinished={props.setFin} setScore={props.setSec} score={props.sec}/> : <Start props={setStart} />} 
    </div>
  );
}

export default QuizContainer;