import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Registration";
import Login from "./pages/Login";
import Homepage from "./pages/index";
import Student from "./pages/Student";
import Alumni from "./pages/Alumni";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student" element={<Student />} />
        <Route path="/alumni" element={<Alumni />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;