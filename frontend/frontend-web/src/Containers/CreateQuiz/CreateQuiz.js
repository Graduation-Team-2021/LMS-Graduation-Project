import React, { Component } from "react";
import Input from "../../Components/NormalTextField/NormalTextField";
import classes from './CreateQuiz.module.css'

class CreateQuiz extends Component {



  render() {
    return (
      <div>
        <h1 className={classes.MainTitle}>
          Create Quiz for {this.props.name}
        </h1>
        <Input Name="Duration"></Input>
        <Input ></Input>
      </div>
    );
  }
}
/* Top: Duration
 Bottom: List of Questions
 Questions: 2 Types (one/MultiChoice Choice/True or false "2 Choices only") */
export default CreateQuiz;
