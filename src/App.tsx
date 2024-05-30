import { useState } from "react";
import "./App.css";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions, Difficulty, QuestionState } from "./API";

type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTION = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [clicked, setClicked] = useState(false);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTION,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      if (correct) {
        setScore(score + 1);
        e.currentTarget.className = `${e.currentTarget.className} correct_answer`;
      } else {
        console.log(questions[number].correct_answer);
      }

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQ = number + 1;

    console.log(questions[nextQ].correct_answer);

    if (nextQ === TOTAL_QUESTION) {
      setGameOver(true);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <div className="px-12 bg-white div-container md:max-w-4xl sm:max-w-2xl flex align-center flex-col container mx-auto mt-20 h-96 ">
      <h1 className="my-5 text-4xl transparent-text font-bold text-center">
        REACT QUIZ
      </h1>
      {gameOver || userAnswers.length === TOTAL_QUESTION ? (
        <button
          className="start mx-auto rounded-lg font-bold text-green-500"
          onClick={startTrivia}
        >
          Start
        </button>
      ) : null}
      {!gameOver && (
        <p className="score text-white text-xl font-semibold underline underline-offset-4">
          Score: {score}
        </p>
      )}

      {loading && (
        <p className="loading text-white text-2xl text-center font-bold">
          Loading Questions...
        </p>
      )}

      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestion={TOTAL_QUESTION}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
          clickedState={{ clicked, setClicked }}
        />
      )}
      {!gameOver &&
      !loading &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTION - 1 ? (
        <button
          className="next start mx-auto rounded-lg font-bold text-green-500"
          onClick={nextQuestion}
        >
          Next
        </button>
      ) : null}
    </div>
  );
}

export default App;
