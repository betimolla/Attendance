import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import GeneralAdmin from "./pages/GeneralAdmin";






function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/general-admin" element={<GeneralAdmin />} />
        
      </Routes>
    </Router>
  );
}

export default App;



