import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { saveAttempt } from "./utils/indb";
import { v4 as uuidv4 } from 'uuid';

const quizData = [
  { type: "mcq", question: "Which planet is closest to the Sun?", options: ["Venus", "Mercury", "Earth", "Mars"], answer: "Mercury" },
  { type: "mcq", question: "Which data structure follows FIFO?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Queue" },
  { type: "mcq", question: "Which of the following is primarily used for structuring web pages?", options: ["Python", "Java", "HTML", "C++"], answer: "HTML" },
  { type: "mcq", question: "Which chemical symbol stands for Gold?", options: ["Au", "Gd", "Ag", "Pt"], answer: "Au" },
  { type: "mcq", question: "Which of these processes is not typically involved in refining petroleum?", options: ["Fractional distillation", "Cracking", "Polymerization", "Filtration"], answer: "Filtration" },
  { type: "integer", question: "What is the value of 12 + 28?", answer: 40 },
  { type: "integer", question: "How many states are there in the United States?", answer: 50 },
  { type: "integer", question: "In which year was the Declaration of Independence signed?", answer: 1776 },
  { type: "integer", question: "What is the value of pi rounded to the nearest integer?", answer: 3 },
  { type: "integer", question: "If a car travels at 60 mph for 2 hours, how many miles does it travel?", answer: 120 },
];

const Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);
  const [showNext, setShowNext] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!quizStarted || quizFinished) return;
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      alert("Time's up! Moving to the next question.");
      handleNext();
    }
  }, [timeLeft, quizStarted, quizFinished]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setTimeLeft(30);
  };

  const handleSelect = (option) => {
    const value = quizData[currentIndex].type === "integer" ? Number(option) : option;
    setAnswers((prev) => ({ ...prev, [currentIndex]: value }));
  };
  
  const handleSubmit = () => {
    if (!answers[currentIndex]) {
      alert("Select an answer first.");
      return;
    }
    setSubmittedAnswers((prev) => ({ ...prev, [currentIndex]: answers[currentIndex] }));
    setShowNext(true);
  };

  const handleNext = () => {
    if (currentIndex < quizData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(30);
      setShowNext(false);
    } else {
      setQuizFinished(true);
      saveQuizAttempt();
    }
  };

  const saveQuizAttempt = async () => {
    const detailedResults = quizData.map((question, i) => {
      const userAnswer = submittedAnswers[i];
      const correctAnswer = question.answer;

      return {
        question: question.question,
        userAnswer: userAnswer || "Not Answered",
        correctAnswer: correctAnswer,
        isCorrect: (typeof userAnswer === 'number' && userAnswer === correctAnswer) || (userAnswer === correctAnswer)
      };
    });

    const score = detailedResults.filter(q => q.isCorrect).length;

    const attempt = {
      id: uuidv4(), 
      timestamp: new Date().toISOString(),
      score: score,
      total: quizData.length,
      details: detailedResults
    };

    try {
      await saveAttempt(attempt);
    } catch (error) {
      console.error("Error saving attempt:", error);
      alert("There was an error saving your quiz results. Please try again.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-4xl flex justify-between items-center mb-6">
      </div>

      {!quizStarted ? (
        <div className="text-center">
          <button
            onClick={handleStartQuiz}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-blue-600"
          >
            Start Quiz
          </button>
          <button
            onClick={() => navigate('/history')}
            className="mt-4 bg-purple-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-purple-600 block w-full"
          >
            Check History
          </button>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg text-xl hover:bg-green-600 block w-full"
          >
            Go To Home Page
          </button>
        </div>
      ) : quizFinished ? (
        <div className="p-6 border bg-white rounded-lg shadow-lg w-full max-w-lg">
          <h3 className="text-2xl font-bold mb-4">Results</h3>
          <p className="text-lg mb-4">
            You scored {Object.values(submittedAnswers).filter((a, i) => a === quizData[i].answer).length} / {quizData.length}
          </p>
          <div className="flex gap-4">
            <button 
              onClick={() => navigate("/history")} 
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
            >
              View History
            </button>
            <button 
              onClick={() => {
                setQuizStarted(false);
                setQuizFinished(false);
                setCurrentIndex(0);
                setAnswers({});
                setSubmittedAnswers({});
              }} 
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Take Another Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-lg">
          <div className="p-4 border rounded-lg bg-white shadow-lg">
            <p className="text-lg font-semibold">{currentIndex + 1}. {quizData[currentIndex].question}</p>

            {quizData[currentIndex].type === "mcq" && (
              <div className="mt-3">
                {quizData[currentIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(option)}
                    className={`block w-full text-left p-2 rounded-md border mt-2
                      ${answers[currentIndex] === option ? "bg-blue-500 text-white" : "bg-gray-200"}
                      hover:bg-blue-400 hover:text-white transition-colors
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {quizData[currentIndex].type === "integer" && (
              <input
                type="number"
                value={answers[currentIndex] || ""}
                onChange={(e) => handleSelect(e.target.value)}
                className="mt-3 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter your answer"
              />
            )}

            <p className="mt-2 text-red-500 font-semibold">⏳ Time Left: {timeLeft}s</p>

            {showNext && (
              <p className={`mt-2 font-semibold ${submittedAnswers[currentIndex] === quizData[currentIndex].answer ? "text-green-600" : "text-red-600"}`}>
                {submittedAnswers[currentIndex] === quizData[currentIndex].answer ? "✅ Correct" : `❌ Incorrect (Answer: ${quizData[currentIndex].answer})`}
              </p>
            )}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={handleSubmit}
              className={`bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors
                ${(!answers[currentIndex] || showNext) ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!answers[currentIndex] || showNext}
            >
              Submit Answer
            </button>

            {showNext && (
              <button 
                onClick={handleNext} 
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
              >
                {currentIndex < quizData.length - 1 ? "Next Question" : "Finish Quiz"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;