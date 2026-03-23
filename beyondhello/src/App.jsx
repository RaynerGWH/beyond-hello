import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// Import pages
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import LanguageSelection from "./pages/LanguageSelection";
import ScenarioHub from "./pages/ScenarioHub";
import ScenarioBriefing from "./pages/ScenarioBriefing";
import Gameplay from "./pages/Gameplay";
import Feedback from "./pages/Feedback";
import Outcome from "./pages/Outcome";
import Dashboard from "./pages/Dashboard";
import PhraseWarmUp from "./pages/PhraseWarmUp";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/language" element={<LanguageSelection />} />
          <Route path="/hub" element={<ScenarioHub />} />
          <Route path="/briefing/:scenarioId" element={<ScenarioBriefing />} />
          <Route path="/play/:scenarioId" element={<Gameplay />} />
          <Route path="/practice" element={<PhraseWarmUp />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/outcome" element={<Outcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/play/networking/1" element={<Gameplay />} />
          <Route path="/play/:scenarioId" element={<Gameplay />} />
        </Routes>
      </div>
    </Router>
  );
}

// for each scenarioId -> pg1, pg2

export default App;
