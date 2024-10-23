import { useState, useEffect } from "react";
import Bayquniyyah from "./components/Bayquniyyah";
import HomePage from "./components/Homepage";
import Arbaeen from "./components/Arbaeen";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bayquniyyah" element={<Bayquniyyah />} />
        <Route path="/arbaeen" element={<Arbaeen />} />
      </Routes>
    </Router>
  );
}

export default App;
