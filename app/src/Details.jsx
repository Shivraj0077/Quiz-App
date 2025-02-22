// QuizDetails.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAttemptById } from "./utils/indb";

const QuizDetails = () => {
  const { id } = useParams();
  const [attempt, setAttempt] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const userStr = localStorage.getItem("loggedInUser");
      if (!userStr) {
        navigate("/login");
        return false;
      }
      return true;
    };

    const fetchAttempt = async () => {
      if (!checkAuth()) return;
      
      try {
        const attemptData = await getAttemptById(id);
        if (!attemptData) {
          navigate("/history");
          return;
        }
        setAttempt(attemptData);
      } catch (error) {
        console.error("Error fetching attempt:", error);
        navigate("/history");
      } finally {
        setLoading(false);
      }
    };

    fetchAttempt();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 text-lg">Loading...</div>
      </div>
    );
  }

  if (!attempt) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-lg">Attempt not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate("/history")}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            Back to History
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Take New Quiz
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Quiz Details</h3>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-gray-600">
              Date: <span className="text-gray-900">{new Date(attempt.timestamp).toLocaleString()}</span>
            </p>
            <p className="text-gray-600 mt-2">
              Score: <span className="text-blue-600 font-medium">{attempt.score}/{attempt.total}</span>
            </p>
          </div>

          <div className="space-y-6">
            {attempt.details.map((q, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium text-gray-900 mb-3">{q.question}</p>
                <div className="space-y-2">
                  <p className={`${q.isCorrect ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                    <span className="font-medium">Your Answer:</span>
                    <span className="ml-2">{q.userAnswer}</span>
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <span className="font-medium">Correct Answer:</span>
                    <span className="ml-2">{q.correctAnswer}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetails;