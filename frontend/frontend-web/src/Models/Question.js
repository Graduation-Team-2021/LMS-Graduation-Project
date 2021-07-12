export class Question {
  Text = "";
  Answers = [""];
  CorrectAnswers = [];
  Type = "Choose";
  Points = 0;
}

const setQuestion = (Data) => {
  //TODO: Set Question
  const result = {
    question: Data.Text,
    mark: Data.Points,
  };
  const Answers = [];
  for (let index = 0; index < Data.Answers.length; index++) {
    var x = 0;
    if (Data.CorrectAnswers.includes(Data.Answers[index])) x = 1;
    Answers.push(setAnswer(Data.Answers[index], x));
  }
  result["answers"] = Answers;
  return result;
};

const setAnswer = (Data, x) => {
  const result = { answer: Data, right_answer: x };
  return result;
};

export const setQuiz = (Data) => {
  //TODO: Set Question
  const result = {
    course_id: Data.Course,
    exam_duration: Data.Duration.toString() + " " + Data.Unit[0].value,
  };
  var mark = 0;
  const Questions = [];
  for (let index = 0; index < Data.Questions.length; index++) {
    mark += parseInt(Data.Questions[index].Points);
    Questions.push(setQuestion(Data.Questions[index]));
  }
  result["exam_marks"] = mark;
  result["questions"] = Questions;
  return result;
};
