import { useState } from "react";
import "../App.css";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNr: number;
  totalQuestion: number;
  clickedState: {
    clicked: boolean;
    setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestion,
  clickedState,
}) => {
  const { clicked, setClicked } = clickedState;

  const getAlpha = (num: number) => {
    switch (num) {
      case 0:
        return "a";
      case 1:
        return "b";
      case 2:
        return "c";
      case 3:
        return "d";
      default:
        return null;
    }
  };

  return (
    <div className="card">
      <p className="number">
        Question: {questionNr} / {totalQuestion}
      </p>
      <p className="question">
        {questionNr}
        {") "}
        <span dangerouslySetInnerHTML={{ __html: question }}></span>
      </p>
      <ul className="answers">
        {answers.map((answer, i) => (
          <li key={answer} className="answer">
            <button
              disabled={userAnswer}
              onClick={(e) => {
                setClicked(true);
                callback(e);
              }}
              className={`ans-btn ${clicked && "incorrect_answer"}`}
              value={answer}
            >
              {getAlpha(i)}
              {") "}
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
