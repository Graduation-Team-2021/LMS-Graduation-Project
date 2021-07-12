export class Question {
  Text = "";
  Answers = [""];
  CorrectAnswers = [];
  Type = "Choose";
  Points = 0;
}

export const setQuestion = (Data) => {
  //TODO: Set Question
  const result = {
    question: Data.Text,
    mark: Data.Points,
    answers: Data.Answers,
    correct_answers: Data.CorrectAnswers,
  };
  return result;
};

export const setQuiz = (Data) => {
  //TODO: Set Question
  const result = {
    course_id: Data.Course,
    exam_duration: Data.Duration.toString() + " " + Data.Unit[0].value,
  };
  var mark = 0;
  const Questions=[];  
  for (let index = 0; index < Data.Questions.length; index++) {
    mark += parseInt(Data.Questions[index].Points);
    Questions.push(setQuestion(Data.Questions[index]));
  }
  result["exam_marks"] = mark;
  result['questions'] = Data.Questions
  return result;
};
