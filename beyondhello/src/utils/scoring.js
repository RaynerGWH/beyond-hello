// Scoring and XP calculation utilities

/**
 * Calculate score for a scene based on selected option
 */
export function calculateSceneScore(selectedOption) {
  let score = selectedOption.baseScore;
  
  // Bonus for optimal choices
  if (selectedOption.isOptimal) {
    score += 5;
  }
  
  return Math.min(score, 100); // Cap at 100
}

/**
 * Calculate total XP earned from a scenario
 */
export function calculateScenarioXP(scoresPerScene, scenarioXPReward, isDailyBonus = false) {
  // Base XP from scenario
  let baseXP = scenarioXPReward;
  
  // Average score across all scenes
  const avgScore = scoresPerScene.reduce((a, b) => a + b, 0) / scoresPerScene.length;
  
  // Accuracy bonus (0-10 XP based on average score)
  const accuracyBonus = Math.floor((avgScore / 100) * 10);
  
  // Daily quest bonus
  const dailyBonus = isDailyBonus ? 4 : 0;
  
  return {
    baseXP,
    accuracyBonus,
    dailyBonus,
    totalXP: baseXP + accuracyBonus + dailyBonus,
    avgScore
  };
}

/**
 * Determine outcome variant based on average score
 */
export function determineOutcome(avgScore) {
  if (avgScore >= 90) return 'excellent';
  if (avgScore >= 75) return 'good';
  if (avgScore >= 60) return 'fair';
  return 'struggled';
}

/**
 * Calculate skill gains based on performance
 */
export function calculateSkillGains(avgScore) {
  // Higher score = more skill gains
  const pronunciation = avgScore >= 80 ? 2 : 1;
  const fluency = avgScore >= 85 ? 1 : 0;
  
  return { pronunciation, fluency };
}

/**
 * Update streak counter
 * Returns: null (same day), 'continue' (streak continues), or 'reset' (streak broken)
 */
export function updateStreak(lastActiveDate) {
  if (!lastActiveDate) return 1; // First time
  
  const today = new Date().toDateString();
  const last = new Date(lastActiveDate).toDateString();
  
  if (today === last) {
    // Same day, no change to streak
    return null;
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toDateString();
  
  if (yesterdayStr === last) {
    // Streak continues
    return 'continue';
  } else {
    // Streak broken
    return 'reset';
  }
}

/**
 * Check if user qualifies for daily bonus
 */
export function checkDailyBonus(progress) {
  const today = new Date().toDateString();
  const lastActive = progress.lastActiveDate ? new Date(progress.lastActiveDate).toDateString() : null;
  
  // Daily bonus if this is first scenario completion today
  return today !== lastActive;
}