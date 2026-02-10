// Level system configuration

export const levelRanks = {
  1: { label: 'Beginner', min: 0, max: 100 },
  2: { label: 'Beginner', min: 100, max: 300 },
  3: { label: 'Intermediate', min: 300, max: 600 },
  4: { label: 'Intermediate', min: 600, max: 1000 },
  5: { label: 'Expert', min: 1000, max: 1500 },
  6: { label: 'Expert', min: 1500, max: Infinity }
};

/**
 * Get user's current level information based on XP
 */
export function getUserLevel(xp) {
  for (let [level, data] of Object.entries(levelRanks)) {
    if (xp >= data.min && xp < data.max) {
      const progress = data.max === Infinity 
        ? 100 
        : ((xp - data.min) / (data.max - data.min)) * 100;
        
      return {
        level: parseInt(level),
        label: data.label,
        currentXP: xp,
        minXP: data.min,
        maxXP: data.max,
        progress: Math.round(progress),
        xpToNext: data.max === Infinity ? 0 : data.max - xp
      };
    }
  }
  
  // Fallback (shouldn't happen)
  return {
    level: 1,
    label: 'Beginner',
    currentXP: 0,
    minXP: 0,
    maxXP: 100,
    progress: 0,
    xpToNext: 100
  };
}

/**
 * Get the label for the next level
 */
export function getNextLevelLabel(currentLevel) {
  const nextLevel = levelRanks[currentLevel + 1];
  return nextLevel ? nextLevel.label : 'Master';
}

export default levelRanks;