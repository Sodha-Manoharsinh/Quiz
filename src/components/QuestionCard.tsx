import "../App.css";

type Props = {
  question: string;
  answers: string[];
  callback: any;
  userAnswer: any;
  questionNr: number;
  totalQuestion: number;
  correctAnswer: string;
};

const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestion,
  correctAnswer,
}) => {
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

  const setColors = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btns = Array.from(
      document.getElementsByClassName("ans-btn")
    ) as HTMLButtonElement[];

    btns.forEach((btn) => {
      if (btn.value === correctAnswer) {
        btn.className = `${btn.className} correct_answer`;
      } else {
        btn.className = `${btn.className} incorrect_answer`;
      }
    });

    // if (e.currentTarget.value === correctAnswer) {
    //   e.currentTarget.className = `${e.currentTarget.className} correct_answer`;
    // } else {
    //   e.currentTarget.className = `${e.currentTarget.className} incorrect_answer`;
    // }
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
                callback(e);
                setColors(e);
              }}
              className="ans-btn"
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
