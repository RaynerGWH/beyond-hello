// LocalStorage utility functions

const STORAGE_KEYS = {
  USER: 'beyondhello_user',
  PROGRESS: 'beyondhello_progress',
  SESSION: 'beyondhello_session',
  SCENARIOS: 'beyondhello_scenarios',
  TEMPORARY_SCENARIO: 'beyondhello_temporary_scenario'
};

// Initial data structures
const initialUser = {
  name: '',
  email: '',
  targetLanguage: '',
  createdAt: null
};

const initialProgress = {
  totalXP: 0,
  currentLevel: 1,
  tokenLimit: 20,
  tokensRemaining: 20,
  lowTokenPopupShown: false,
  completedScenarios: [],
  skills: {
    pronunciation: 0,
    fluency: 0,
    vocabulary: 0,
    grammar: 0
  },
  streak: 0,
  lastActiveDate: null,
  accuracyHistory: [] // { date, score }
};

const initialSession = {
  scenarioId: null,
  currentSceneIndex: 0,
  choicesMade: [],
  scoresPerScene: [],
  startTime: null,
  endTime: null
};

// Storage utility object
// ─── Demo seed ───────────────────────────────────────────────────────────────
// Writes realistic demo data the first time the dashboard is visited.
// Never runs if the user has already completed at least one scenario.
export function seedDemoDataIfEmpty() {
  const progress = storage.getProgress();

  if (progress.completedScenarios && progress.completedScenarios.length > 0) {
    return; // real data exists — leave it untouched
  }

  const now = Date.now();
  const DAY = 86400000;

  storage.setProgress({
    totalXP: 245,
    currentLevel: 3,
    tokenLimit: 20,
    tokensRemaining: 10,
    lowTokenPopupShown: false,
    completedScenarios: ['networking'],
    skills: { pronunciation: 12, fluency: 8, vocabulary: 6, grammar: 4 },
    streak: 4,
    lastActiveDate: new Date(now - DAY).toISOString(),
    accuracyHistory: [
      { date: new Date(now - 5 * DAY).toISOString(), score: 75 },
      { date: new Date(now - 4 * DAY).toISOString(), score: 78 },
      { date: new Date(now - 3 * DAY).toISOString(), score: 82 },
      { date: new Date(now - 2 * DAY).toISOString(), score: 88 },
      { date: new Date(now - DAY).toISOString(), score: 90 },
      { date: new Date(now).toISOString(), score: 95 },
    ]
  });

  const user = storage.getUser();
  if (!user.name) {
    storage.setUser({ ...user, name: 'Alex', targetLanguage: 'zh-CN' });
  }
}

// ─── Storage utilities ────────────────────────────────────────────────────────
export const storage = {
  // User methods
  getUser: () => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : initialUser;
  },
  
  setUser: (user) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },
  
  // Progress methods
  getProgress: () => {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : initialProgress;
  },
  
  setProgress: (progress) => {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  },
  
  // Session methods
  getSession: () => {
    const data = localStorage.getItem(STORAGE_KEYS.SESSION);
    return data ? JSON.parse(data) : initialSession;
  },
  
  setSession: (session) => {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(session));
  },
  
  clearSession: () => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  // Temporary AI scenario methods
  getTemporaryScenario: () => {
    const data = sessionStorage.getItem(STORAGE_KEYS.TEMPORARY_SCENARIO);
    return data ? JSON.parse(data) : null;
  },

  setTemporaryScenario: (scenario) => {
    sessionStorage.setItem(STORAGE_KEYS.TEMPORARY_SCENARIO, JSON.stringify(scenario));
  },

  clearTemporaryScenario: () => {
    sessionStorage.removeItem(STORAGE_KEYS.TEMPORARY_SCENARIO);
  },
  
  // Scenarios methods
  getScenarios: () => {
    const data = localStorage.getItem(STORAGE_KEYS.SCENARIOS);
    if (!data) {
      return null; // Will be initialized with default data later
    }
    return JSON.parse(data);
  },
  
  setScenarios: (scenarios) => {
    localStorage.setItem(STORAGE_KEYS.SCENARIOS, JSON.stringify(scenarios));
  },
  
  updateScenarioStatus: (scenarioId, updates) => {
    const scenarios = storage.getScenarios();
    if (!scenarios) return;
    
    const updated = scenarios.map(s => 
      s.id === scenarioId ? { ...s, ...updates } : s
    );
    storage.setScenarios(updated);
  },
  
  // Initialize progress (called on signup)
  initializeProgress: () => {
    storage.setProgress(initialProgress);
    storage.clearTemporaryScenario();
  }
};

export default storage;