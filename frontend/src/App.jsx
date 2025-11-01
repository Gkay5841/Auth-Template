import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Sign from "./signup";
import Login from "./login.jsx";
import Admin from "./admin.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Sign/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
