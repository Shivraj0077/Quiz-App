import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users")) || []; // Get all users

    if (users.some(user => user.username === username)) { // Check if username exists
      alert("User is already registered");
      navigate("/login");
    } else {
      users.push({ username, password, history: [] }); // Add new user with empty history
      localStorage.setItem("users", JSON.stringify(users));
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
          Create Account
        </h2>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <button
            onClick={handleRegister}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Sign Up
          </button>
        </div>
        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
