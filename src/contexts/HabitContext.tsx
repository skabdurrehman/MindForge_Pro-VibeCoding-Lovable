import React, { createContext, useContext, useState, useEffect } from 'react';

export interface LectureDay {
  date: string;
  lectures: number;
  xp: number;
  badges: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  dateEarned?: string;
  requirement: string;
}

interface HabitContextType {
  lectureData: Record<string, LectureDay>;
  addLecture: (date: string) => void;
  removeLecture: (date: string) => void;
  getTodayData: () => LectureDay;
  getTotalXP: () => number;
  getStreak: () => number;
  badges: Badge[];
  checkAndAwardBadges: () => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

const defaultBadges: Badge[] = [
  {
    id: 'first-day',
    name: 'First Steps',
    description: 'Completed your first lecture!',
    icon: '🎯',
    earned: false,
    requirement: 'Complete 1 lecture'
  },
  {
    id: 'daily-duo',
    name: 'Daily Duo',
    description: 'Completed 2 lectures in a day!',
    icon: '🔥',
    earned: false,
    requirement: 'Complete 2 lectures in one day'
  },
  {
    id: 'perfect-day',
    name: 'Perfect Day',
    description: 'Completed all 3 lectures in a day!',
    icon: '⭐',
    earned: false,
    requirement: 'Complete 3 lectures in one day'
  },
  {
    id: 'three-day-streak',
    name: 'On Fire',
    description: 'Maintained a 3-day perfect streak!',
    icon: '🔥',
    earned: false,
    requirement: 'Complete 3 consecutive perfect days'
  },
  {
    id: 'weekly-warrior',
    name: 'Weekly Warrior',
    description: 'Completed 7 perfect days in a row!',
    icon: '⚔️',
    earned: false,
    requirement: 'Complete 7 consecutive perfect days'
  },
  {
    id: 'century-club',
    name: 'Century Club',
    description: 'Earned 100 XP!',
    icon: '💯',
    earned: false,
    requirement: 'Earn 100 total XP'
  },
  {
    id: 'lecture-lover',
    name: 'Lecture Lover',
    description: 'Completed 25 lectures!',
    icon: '📚',
    earned: false,
    requirement: 'Complete 25 total lectures'
  },
  {
    id: 'dedication-rookie',
    name: 'Dedication Rookie',
    description: 'Completed 10 perfect days!',
    icon: '🌱',
    earned: false,
    requirement: 'Complete 10 consecutive perfect days'
  },
  {
    id: 'month-master',
    name: 'Month Master',
    description: 'Completed a full month of perfect days!',
    icon: '👑',
    earned: false,
    requirement: 'Complete 30 consecutive perfect days'
  },
  {
    id: 'xp-legend',
    name: 'XP Legend',
    description: 'Reached 500 XP!',
    icon: '🚀',
    earned: false,
    requirement: 'Earn 500 total XP'
  },
  {
    id: 'knowledge-seeker',
    name: 'Knowledge Seeker',
    description: 'Completed 100 lectures!',
    icon: '🔍',
    earned: false,
    requirement: 'Complete 100 total lectures'
  },
  {
    id: 'dedication-master',
    name: 'Dedication Master',
    description: 'Completed 50 perfect days!',
    icon: '🏆',
    earned: false,
    requirement: 'Complete 50 consecutive perfect days'
  },
  {
    id: 'consistency-champion',
    name: 'Consistency Champion',
    description: 'Never missed a single lecture in 2 weeks!',
    icon: '🎖️',
    earned: false,
    requirement: 'Complete 14 consecutive perfect days'
  },
  {
    id: 'xp-titan',
    name: 'XP Titan',
    description: 'Reached 1000 XP!',
    icon: '⚡',
    earned: false,
    requirement: 'Earn 1000 total XP'
  },
  {
    id: 'lecture-machine',
    name: 'Lecture Machine',
    description: 'Completed 250 lectures!',
    icon: '🤖',
    earned: false,
    requirement: 'Complete 250 total lectures'
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Completed 100 perfect days streak!',
    icon: '💪',
    earned: false,
    requirement: 'Complete 100 consecutive perfect days'
  },
  {
    id: 'genius-level',
    name: 'Genius Level',
    description: 'Completed 500 lectures!',
    icon: '🧠',
    earned: false,
    requirement: 'Complete 500 total lectures'
  },
  {
    id: 'quarter-year-hero',
    name: 'Quarter Year Hero',
    description: 'Completed 90 perfect days!',
    icon: '🦸‍♂️',
    earned: false,
    requirement: 'Complete 90 consecutive perfect days'
  },
  {
    id: 'xp-soldier',
    name: 'XP Soldier',
    description: 'Reached 2500 XP!',
    icon: '🎖️',
    earned: false,
    requirement: 'Earn 2500 total XP'
  },
  {
    id: 'half-year-champion',
    name: 'Half Year Champion',
    description: 'Completed 180 perfect days!',
    icon: '🏅',
    earned: false,
    requirement: 'Complete 180 consecutive perfect days'
  },
  {
    id: 'marathon-runner',
    name: 'Marathon Runner',
    description: 'Completed 200 perfect days streak!',
    icon: '🏃‍♂️',
    earned: false,
    requirement: 'Complete 200 consecutive perfect days'
  },
  {
    id: 'xp-commander',
    name: 'XP Commander',
    description: 'Reached 5000 XP!',
    icon: '👨‍✈️',
    earned: false,
    requirement: 'Earn 5000 total XP'
  },
  {
    id: 'ultimate-scholar',
    name: 'Ultimate Scholar',
    description: 'Completed 1000 lectures!',
    icon: '🌟',
    earned: false,
    requirement: 'Complete 1000 total lectures'
  },
  {
    id: 'consistency-king',
    name: 'Consistency King',
    description: 'Completed 300 perfect days streak!',
    icon: '👑',
    earned: false,
    requirement: 'Complete 300 consecutive perfect days'
  },
  {
    id: 'year-champion',
    name: 'Year Champion',
    description: 'Completed 365 perfect days!',
    icon: '🎖️',
    earned: false,
    requirement: 'Complete 365 consecutive perfect days'
  },
  {
    id: 'xp-emperor',
    name: 'XP Emperor',
    description: 'Reached 10000 XP!',
    icon: '👑',
    earned: false,
    requirement: 'Earn 10000 total XP'
  },
  {
    id: 'learning-legend',
    name: 'Learning Legend',
    description: 'Completed 2000 lectures!',
    icon: '📖',
    earned: false,
    requirement: 'Complete 2000 total lectures'
  },
  {
    id: 'persistence-hero',
    name: 'Persistence Hero',
    description: 'Completed 500 perfect days streak!',
    icon: '🦸‍♂️',
    earned: false,
    requirement: 'Complete 500 consecutive perfect days'
  },
  {
    id: 'xp-supreme',
    name: 'XP Supreme',
    description: 'Reached 25000 XP!',
    icon: '🌟',
    earned: false,
    requirement: 'Earn 25000 total XP'
  },
  {
    id: 'lecture-overlord',
    name: 'Lecture Overlord',
    description: 'Completed 3000 lectures!',
    icon: '🔮',
    earned: false,
    requirement: 'Complete 3000 total lectures'
  },
  {
    id: 'endurance-master',
    name: 'Endurance Master',
    description: 'Completed 750 perfect days streak!',
    icon: '💪',
    earned: false,
    requirement: 'Complete 750 consecutive perfect days'
  },
  {
    id: 'wisdom-seeker',
    name: 'Wisdom Seeker',
    description: 'Completed 5000 lectures!',
    icon: '🧙‍♂️',
    earned: false,
    requirement: 'Complete 5000 total lectures'
  },
  {
    id: 'ultimate-warrior',
    name: 'Ultimate Warrior',
    description: 'Completed 1000 perfect days streak!',
    icon: '⚡',
    earned: false,
    requirement: 'Complete 1000 consecutive perfect days'
  },
  {
    id: 'xp-master',
    name: 'XP Master',
    description: 'Reached 50000 XP!',
    icon: '🎯',
    earned: false,
    requirement: 'Earn 50000 total XP'
  },
  {
    id: 'knowledge-warrior',
    name: 'Knowledge Warrior',
    description: 'Completed 10000 lectures!',
    icon: '⚔️',
    earned: false,
    requirement: 'Complete 10000 total lectures'
  }
];

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [lectureData, setLectureData] = useState<Record<string, LectureDay>>({});
  const [badges, setBadges] = useState<Badge[]>(defaultBadges);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('habit-tracker-data');
    const savedBadges = localStorage.getItem('habit-tracker-badges');
    
    if (savedData) {
      setLectureData(JSON.parse(savedData));
    }
    
    if (savedBadges) {
      const parsedBadges = JSON.parse(savedBadges);
      // Ensure saved badges match the current structure by merging with defaults
      const mergedBadges = defaultBadges.map((defaultBadge, index) => {
        const savedBadge = parsedBadges[index];
        return savedBadge && savedBadge.id === defaultBadge.id ? savedBadge : defaultBadge;
      });
      setBadges(mergedBadges);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('habit-tracker-data', JSON.stringify(lectureData));
  }, [lectureData]);

  useEffect(() => {
    localStorage.setItem('habit-tracker-badges', JSON.stringify(badges));
  }, [badges]);

  const getTodayString = () => {
    return new Date().toISOString().split('T')[0];
  };

  const addLecture = (date: string) => {
    setLectureData(prev => {
      const existing = prev[date] || { date, lectures: 0, xp: 0, badges: [] };
      const newLectures = existing.lectures + 1;
      const newXP = existing.xp + 10 * getMultiplier(date);
      return {
        ...prev,
        [date]: {
          ...existing,
          lectures: newLectures,
          xp: newXP
        }
      };
    });
  };

  const removeLecture = (date: string) => {
    setLectureData(prev => {
      const existing = prev[date];
      if (existing && existing.lectures > 0) {
        const newLectures = existing.lectures - 1;
        const newXP = Math.max(0, existing.xp - 10 * getMultiplier(date));
        return {
          ...prev,
          [date]: {
            ...existing,
            lectures: newLectures,
            xp: newXP
          }
        };
      }
      return prev;
    });
  };

  const getMultiplier = (date: string) => {
    const streak = getStreakForDate(date);
    if (streak >= 5) return 1.5;
    return 1;
  };

  const getStreakForDate = (targetDate: string) => {
    const dates = Object.keys(lectureData).sort();
    const targetIndex = dates.indexOf(targetDate);
    let streak = 0;
    
    for (let i = targetIndex; i >= 0; i--) {
      const dayData = lectureData[dates[i]];
      if (dayData && dayData.lectures >= 3) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getTodayData = (): LectureDay => {
    const today = getTodayString();
    return lectureData[today] || { date: today, lectures: 0, xp: 0, badges: [] };
  };

  const getTotalXP = () => {
    return Object.values(lectureData).reduce((total, day) => total + day.xp, 0);
  };

  const getStreak = () => {
    const sortedDates = Object.keys(lectureData)
      .filter(date => lectureData[date].lectures >= 3)
      .sort()
      .reverse();
    
    if (sortedDates.length === 0) return 0;
    
    let streak = 0;
    const today = new Date();
    
    for (const dateStr of sortedDates) {
      const date = new Date(dateStr);
      const diffTime = Math.abs(today.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === streak || diffDays === streak + 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const checkAndAwardBadges = () => {
    setBadges(prev => {
      const newBadges = [...prev];
      const totalXP = getTotalXP();
      const streak = getStreak();
      const todayData = getTodayData();
      const hasCompletedLecture = Object.values(lectureData).some(day => day.lectures > 0);
      const totalLectures = Object.values(lectureData).reduce((sum, day) => sum + day.lectures, 0);
      
      // Define badge checks with safe array access
      const badgeChecks = [
        { index: 0, condition: hasCompletedLecture }, // First Steps
        { index: 1, condition: todayData.lectures >= 2 }, // Daily Duo
        { index: 2, condition: todayData.lectures >= 3 }, // Perfect Day
        { index: 3, condition: streak >= 3 }, // On Fire
        { index: 4, condition: streak >= 7 }, // Weekly Warrior
        { index: 5, condition: totalXP >= 100 }, // Century Club
        { index: 6, condition: totalLectures >= 25 }, // Lecture Lover
        { index: 7, condition: streak >= 10 }, // Dedication Rookie
        { index: 8, condition: streak >= 30 }, // Month Master
        { index: 9, condition: totalXP >= 500 }, // XP Legend
        { index: 10, condition: totalLectures >= 100 }, // Knowledge Seeker
        { index: 11, condition: streak >= 50 }, // Dedication Master
        { index: 12, condition: streak >= 14 }, // Consistency Champion
        { index: 13, condition: totalXP >= 1000 }, // XP Titan
        { index: 14, condition: totalLectures >= 250 }, // Lecture Machine
        { index: 15, condition: streak >= 100 }, // Unstoppable
        { index: 16, condition: totalLectures >= 500 }, // Genius Level
        { index: 17, condition: streak >= 90 }, // Quarter Year Hero
        { index: 18, condition: totalXP >= 2500 }, // XP Soldier
        { index: 19, condition: streak >= 180 }, // Half Year Champion
        { index: 20, condition: streak >= 200 }, // Marathon Runner
        { index: 21, condition: totalXP >= 5000 }, // XP Commander
        { index: 22, condition: totalLectures >= 1000 }, // Ultimate Scholar
        { index: 23, condition: streak >= 300 }, // Consistency King
        { index: 24, condition: streak >= 365 }, // Year Champion
        { index: 25, condition: totalXP >= 10000 }, // XP Emperor
        { index: 26, condition: totalLectures >= 2000 }, // Learning Legend
        { index: 27, condition: streak >= 500 }, // Persistence Hero
        { index: 28, condition: totalXP >= 25000 }, // XP Supreme
        { index: 29, condition: totalLectures >= 3000 }, // Lecture Overlord
        { index: 30, condition: streak >= 750 }, // Endurance Master
        { index: 31, condition: totalLectures >= 5000 }, // Wisdom Seeker
        { index: 32, condition: streak >= 1000 }, // Ultimate Warrior
        { index: 33, condition: totalXP >= 50000 }, // XP Master
        { index: 34, condition: totalLectures >= 10000 }, // Knowledge Warrior
      ];

      // Safely check and award badges
      badgeChecks.forEach(({ index, condition }) => {
        if (index < newBadges.length && newBadges[index] && !newBadges[index].earned && condition) {
          newBadges[index] = { 
            ...newBadges[index], 
            earned: true, 
            dateEarned: new Date().toISOString() 
          };
        }
      });
      
      return newBadges;
    });
  };

  return (
    <HabitContext.Provider value={{
      lectureData,
      addLecture,
      removeLecture,
      getTodayData,
      getTotalXP,
      getStreak,
      badges,
      checkAndAwardBadges
    }}>
      {children}
    </HabitContext.Provider>
  );
}

export const useHabit = () => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabit must be used within a HabitProvider');
  }
  return context;
};
