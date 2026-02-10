// LocalStorage utility functions

const STORAGE_KEYS = {
  USER: 'beyondhello_user',
  PROGRESS: 'beyondhello_progress',
  SESSION: 'beyondhello_session',
  SCENARIOS: 'beyondhello_scenarios'
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
  }
};

export default storage;