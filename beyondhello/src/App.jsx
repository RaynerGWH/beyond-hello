import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { trackEvent } from "./utils/analytics";

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
import SubscriptionPlans from "./pages/SubscriptionPlans";
import AIMode from "./pages/AIMode";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import AccountDeleted from "./pages/AccountDeleted";

function App() {
  useEffect(() => {
    // Track session start on mount
    const userJson = localStorage.getItem('beyondhello_user');
    const userId = userJson ? JSON.parse(userJson)?.email || null : null;
    trackEvent('session_start', { userId });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/language" element={<LanguageSelection />} />
          <Route path="/hub" element={<ScenarioHub />} />
          <Route path="/ai-mode" element={<AIMode />} />
          <Route path="/briefing/:scenarioId" element={<ScenarioBriefing />} />
          <Route path="/play/:scenarioId" element={<Gameplay />} />
          <Route path="/practice" element={<PhraseWarmUp />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/outcome" element={<Outcome />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/plans" element={<SubscriptionPlans />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/support" element={<Support />} />
          <Route path="/account-deleted" element={<AccountDeleted />} />
          <Route path="/play/networking/1" element={<Gameplay />} />
          <Route path="/play/:scenarioId" element={<Gameplay />} />
        </Routes>
      </div>
    </Router>
  );
}

// for each scenarioId -> pg1, pg2

export default App;
