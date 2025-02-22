import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import History from "./History";
import QuizDetails from "./Details";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/details/:id" element={<QuizDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
