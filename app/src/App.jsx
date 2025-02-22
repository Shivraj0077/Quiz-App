import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import History from "./History";
import QuizDetails from "./Details";

const App = () => {
  const isAuthenticated = !!localStorage.getItem("user");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard/> : <Login />} />
        <Route path="/history" element={<History/> }/>
        <Route path="/details/:id" element={<QuizDetails />}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
