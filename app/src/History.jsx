import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAttempts, deleteAttempt } from "./utils/indb";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for logged-in user
    const userStr = localStorage.getItem("loggedInUser");
    if (!userStr) {
      setLoggedInUser(null);
      return;
    }

    const user = JSON.parse(userStr);
    setLoggedInUser(user);

    const fetchHistory = async () => {
      const attempts = await getAttempts();
      // Filter attempts to only show the logged-in user's attempts
      const userAttempts = attempts.filter(attempt => attempt.userId === user.username);
      setHistory(
        userAttempts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      );
    };

    fetchHistory();
  }, []);

  const handleDeleteAttempt = async (id) => {
    const success = await deleteAttempt(id);
    if (success) {
      setHistory((prev) => prev.filter((attempt) => attempt.id !== id));
    }
  };

  // If user is not logged in, show login prompt
  if (!loggedInUser) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Please Login to View History
              </h3>
              <p className="text-gray-500 mb-6">
                You need to be logged in to view your quiz attempt history.
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => navigate("/login")}
                  className="inline-flex items-center px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="inline-flex items-center px-6 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
          >
            Take Quiz Again
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("loggedInUser");
              navigate("/login");
            }}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            Logout
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Attempt History
            </h3>
            <span className="text-gray-600">
              Welcome, {loggedInUser.username}
            </span>
          </div>
          {history.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No attempts yet.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {history.map((attempt, index) => (
                <li
                  key={attempt.id}
                  className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">
                      Attempt {history.length - index}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {new Date(attempt.timestamp).toLocaleString()}
                    </span>
                    <span className="text-blue-600 font-medium">
                      Score: {attempt.score}/{attempt.total}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/details/${attempt.id}`)}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleDeleteAttempt(attempt.id)}
                      className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default History;