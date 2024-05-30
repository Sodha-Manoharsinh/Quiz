import "../App.css";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNr: number;
  totalQuestion: number;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestion,
}) => {
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
              onClick={callback}
              className="ans-btn"
            >
              {i + 1}.{" "}
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionCard;
