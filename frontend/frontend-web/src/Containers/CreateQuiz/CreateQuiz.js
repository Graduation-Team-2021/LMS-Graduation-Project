import React, { Component } from "react";
import Spacer from "react-spacer";

import { AddQuiz } from "../../Interface/Interface";
import { Question, setQuiz } from "../../Models/Question";
import Button from "../../Components/Button/Button";
import Card from "../../Components/Card/Card";
import Input from "../../Components/NormalTextField/NormalTextField";
import classes from "./CreateQuiz.module.css";

class CreateQuiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Course: props.match.params.id,
      Duration: 0,
      Unit: [{ value: "Minutes", name: "Minutes" }],
      CurrentQuestion: 0,
      Questions: [new Question()],
    };
  }

  onSubmit = () => {
    //TODO: Connect Add Quizzes to Backend
    const Q = setQuiz(this.state);
    AddQuiz(Q).then((res) => {
      if (res) {
        alert("Exam Created Successfully");
        this.setState({
          Course: this.props.match.params.id,
          Duration: 0,
          Unit: [{ value: "Minutes", name: "Minutes" }],
          CurrentQuestion: 0,
          Questions: [new Question()],
        });
      } else {
        alert("Failed to create, please try again");
      }
    });
  };

  onSelect = (List, Option, Name) => {
    this.setState((old, props) => {
      const state = { ...old };
      state.Unit = [Option];
      return state;
    });
  };

  onChangePoints = (event, index) => {
    this.setState((prevState) => {
      const Temp = [...prevState.Questions];

      Temp[index].Points = event.target.value;

      return {
        Questions: Temp,
      };
    });
  };

  onChange = (event, id) => {
    if (event.target.name === "Duration") {
      this.setState((prevState) => {
        console.log();
        return {
          Duration: event.target.value,
        };
      });
    } else if (event.target.name.split(" ", 1)[0] === "Question") {
      this.setState((prevState) => {
        const temp = [...prevState.Questions];
        temp[id].Text = event.target.value;
        return {
          Questions: temp,
        };
      });
    }
  };

  onChangeType = ({ value }, index) => {
    this.setState((prevState) => {
      const Temp = [...prevState.Questions];

      Temp[index].Type = value;

      if (value === "True or False") {
        Temp[index].Answers = ["True", "False"];
      } else {
        Temp[index].Answers = [""];
      }

      Temp[index].CorrectAnswers = [];

      return {
        Questions: Temp,
      };
    });
  };

  addAnswers = (index) => {
    this.setState((prevState) => {
      const Temp = [...prevState.Questions];

      Temp[index].Answers.push("");

      return {
        Questions: Temp,
      };
    });
  };

  addCorrectAnswers = (index, answer, type) => {
    this.setState((prevState) => {
      const Temp = [...prevState.Questions];

      if (type === "True or False") {
        Temp[index].CorrectAnswers = [answer];
      } else {
        Temp[index].CorrectAnswers.push(answer);
      }
      return {
        Questions: Temp,
      };
    });
  };

  removeCorrectAnswers = (index, answer) => {
    this.setState((prevState) => {
      const Temp = [...prevState.Questions];

      const pos = Temp[index].CorrectAnswers.findIndex(
        (value) => value === answer
      );

      Temp[index].CorrectAnswers.splice(pos, 1);

      return {
        Questions: Temp,
      };
    });
  };

  onChangeAnswer = (index, a, event) => {
    this.setState((prevState) => {
      const Temp = [...prevState.Questions];

      if (Temp[index].CorrectAnswers.includes(Temp[index].Answers[a])) {
        const pos = Temp[index].CorrectAnswers.findIndex(
          (value) => value === Temp[index].Answers[a]
        );
        Temp[index].CorrectAnswers[pos] = event.target.value;
      }

      Temp[index].Answers[a] = event.target.value;

      return {
        Questions: Temp,
      };
    });
  };

  removeAnswers = (index, a, value) => {
    this.setState((prevState) => {
      const Temp = [...prevState.Questions];

      if (Temp[index].CorrectAnswers.includes(Temp[index].Answers[a])) {
        const pos = Temp[index].CorrectAnswers.findIndex(
          (value) => value === Temp[index].Answers[a]
        );
        Temp[index].CorrectAnswers.splice(pos, 1);
      }

      Temp[index].Answers.splice(a, 1);

      return {
        Questions: Temp,
      };
    });
  };

  AddQuestions = () => {
    console.log("clicked");
    this.setState((prevState) => {
      const Temp = [...prevState.Questions];

      Temp.push(new Question());

      return {
        CurrentQuestion: Temp.length - 1,
        Questions: Temp,
      };
    });
  };

  RemoveQuestions = (index) => {
    this.setState((prevState) => {
      const Temp = [...prevState.Questions];

      Temp.splice(index, 1);

      return {
        CurrentQuestion:
          prevState.CurrentQuestion !== 0
            ? prevState.CurrentQuestion - 1
            : Temp.length - 1,
        Questions: Temp,
      };
    });
  };

  render() {
    const Questions = this.state.Questions.map(
      ({ Text, Answers, Type, CorrectAnswers, Points }, index) => {
        const ans = Answers.map((value, i2) => (
          <span className={classes.Answer}>
            <Input
              Name="Answer"
              Error={value === ""}
              value={value}
              hide
              onChange={(event) => this.onChangeAnswer(index, i2, event)}
            />
            <Spacer width="50px" />
            <Button
              className={classes.Button}
              type={CorrectAnswers.includes(value) ? "correct" : null}
              onClick={
                CorrectAnswers.includes(value)
                  ? () => this.removeCorrectAnswers(index, value)
                  : () => this.addCorrectAnswers(index, value, Type)
              }
            >
              {CorrectAnswers.includes(value) ? "Correct" : "Not Correct"}
            </Button>
            {Type === "Choose" ? (
              <React.Fragment>
                <Spacer width="50px" />
                <Button
                  className={classes.Button}
                  type={"cancel"}
                  onClick={() => this.removeAnswers(index, i2, value)}
                >
                  Remove
                </Button>
              </React.Fragment>
            ) : null}
          </span>
        ));
        return (
          <span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0 2%",
                borderBottom: "10px solid purple",
                borderRadius: "50px",
              }}
            >
              <Input
                Name={`Question ${index + 1}`}
                Error={Text === ""}
                onChange={(event) => this.onChange(event, index)}
                value={Text}
                flex={7}
              />
              <Spacer width="10px" />
              <Input
                value={[{ name: Type, value: Type }]}
                Name="Type"
                onSelect={(List, Item, Name) => this.onChangeType(Item, index)}
                type="select"
                DataList={[
                  { name: "Choose", value: "Choose" },
                  { name: "True or False", value: "True or False" },
                ]}
                flex={2}
              />
              <Spacer width="50px" />
              <Input
                Name="Score"
                type="number"
                Error={Points < 0}
                value={Points}
                onChange={(event) => this.onChangePoints(event, index)}
                flex={3}
              />
              {this.state.Questions.length !== 1 ? (
                <React.Fragment>
                  <Spacer width="10px" />
                  <Button
                    type="cancel"
                    onClick={() => this.RemoveQuestions(index)}
                  >
                    Remove Question
                  </Button>
                </React.Fragment>
              ) : null}
            </span>
            <Spacer width="50px" />
            <div>{ans}</div>
          </span>
        );
      }
    );

    const Buttons = this.state.Questions.map((value, index) => (
      <Button
        className={classes.Circle}
        type={index === this.state.CurrentQuestion ? "correct" : null}
        onClick={() => this.setState({ CurrentQuestion: index })}
      >
        {index + 1}
      </Button>
    ));

    return (
      <span className={classes.Holder}>
        <Card className={classes.Card} shadow>
          <span
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <h1 className={classes.MainTitle}>
              Create Quiz for {this.props.location.state.name}
            </h1>
            <Spacer width="10px" />
            <span className={classes.Duration}>
              <Input
                Name="Duration"
                Error={this.state.Duration === 0}
                type="number"
                value={this.state.Duration}
                onChange={this.onChange}
                flex={3}
              />
              <Spacer width="10px" />
              <Input
                Name="Unit"
                type="select"
                DataList={[
                  { value: "Minutes", name: "Minutes" },
                  { value: "Hours", name: "Hours" },
                ]}
                value={this.state.Unit}
                onSelect={this.onSelect}
                flex={2}
              />
            </span>
          </span>
          {
            /* TODO: Add Per Page Question (Add Animation Later) */
            <Card shadow>
              {Questions[this.state.CurrentQuestion]}
              {
                /* Add Question Numbered Dots for access */
                <div className={classes.Guidance}>{Buttons}</div>
              }
              <span className={classes.BArray}>
                {this.state.Questions[this.state.CurrentQuestion].Type ===
                "Choose" ? (
                  <Button
                    className={classes.Button}
                    onClick={this.addAnswers.bind(
                      this,
                      this.state.CurrentQuestion
                    )}
                  >
                    Add Answers
                  </Button>
                ) : null}
                <Button className={classes.Button} onClick={this.AddQuestions}>
                  Add Questions
                </Button>
                <Button
                  className={classes.Button}
                  type="correct"
                  onClick={this.onSubmit}
                >
                  Submit
                </Button>
              </span>
            </Card>
          }
        </Card>
      </span>
    );
  }
}
/* Top: Duration
 Bottom: List of Questions
 Questions: 2 Types (one/MultiChoice Choice/True or false "2 Choices only") */
export default CreateQuiz;
