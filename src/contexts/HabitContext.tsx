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
    id: 'first-lecture',
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
    description: 'Completed all 3 daily lectures!',
    icon: '⭐',
    earned: false,
    requirement: 'Complete 3 lectures in one day'
  },
  {
    id: 'overachiever',
    name: 'Overachiever',
    description: 'Completed 4 lectures in a day!',
    icon: '💪',
    earned: false,
    requirement: 'Complete 4 lectures in one day'
  },
  {
    id: 'backlog-warrior',
    name: 'Backlog Warrior',
    description: 'Completed 5 lectures in a day!',
    icon: '⚔️',
    earned: false,
    requirement: 'Complete 5 lectures in one day'
  },
  {
    id: 'super-achiever',
    name: 'Super Achiever',
    description: 'Completed 6 lectures in a day!',
    icon: '🚀',
    earned: false,
    requirement: 'Complete 6 lectures in one day'
  },
  {
    id: 'maximum-effort',
    name: 'Maximum Effort',
    description: 'Completed 7 lectures in a day!',
    icon: '👑',
    earned: false,
    requirement: 'Complete 7 lectures in one day'
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
    icon: '⚡',
    earned: false,
    requirement: 'Complete 7 consecutive perfect days'
  },
  {
    id: 'dedication-rookie',
    name: 'Dedication Rookie',
    description: 'Completed 14 perfect days in a row!',
    icon: '🌱',
    earned: false,
    requirement: 'Complete 14 consecutive perfect days'
  },
  {
    id: 'month-master',
    name: 'Month Master',
    description: 'Completed 30 perfect days in a row!',
    icon: '🏆',
    earned: false,
    requirement: 'Complete 30 consecutive perfect days'
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
    id: 'xp-legend',
    name: 'XP Legend',
    description: 'Reached 500 XP!',
    icon: '🌟',
    earned: false,
    requirement: 'Earn 500 total XP'
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
    id: 'xp-commander',
    name: 'XP Commander',
    description: 'Reached 2500 XP!',
    icon: '👨‍✈️',
    earned: false,
    requirement: 'Earn 2500 total XP'
  },
  {
    id: 'xp-emperor',
    name: 'XP Emperor',
    description: 'Reached 5000 XP!',
    icon: '👑',
    earned: false,
    requirement: 'Earn 5000 total XP'
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
    id: 'knowledge-seeker',
    name: 'Knowledge Seeker',
    description: 'Completed 50 lectures!',
    icon: '🔍',
    earned: false,
    requirement: 'Complete 50 total lectures'
  },
  {
    id: 'lecture-machine',
    name: 'Lecture Machine',
    description: 'Completed 100 lectures!',
    icon: '🤖',
    earned: false,
    requirement: 'Complete 100 total lectures'
  },
  {
    id: 'genius-level',
    name: 'Genius Level',
    description: 'Completed 200 lectures!',
    icon: '🧠',
    earned: false,
    requirement: 'Complete 200 total lectures'
  },
  {
    id: 'ultimate-scholar',
    name: 'Ultimate Scholar',
    description: 'Completed 365 lectures!',
    icon: '🎓',
    earned: false,
    requirement: 'Complete 365 total lectures'
  },
  {
    id: 'consistency-champion',
    name: 'Consistency Champion',
    description: 'Completed 60 perfect days in a row!',
    icon: '🎖️',
    earned: false,
    requirement: 'Complete 60 consecutive perfect days'
  },
  {
    id: 'persistence-hero',
    name: 'Persistence Hero',
    description: 'Completed 100 perfect days in a row!',
    icon: '🦸‍♂️',
    earned: false,
    requirement: 'Complete 100 consecutive perfect days'
  },
  {
    id: 'half-year-champion',
    name: 'Half Year Champion',
    description: 'Completed 180 perfect days in a row!',
    icon: '🏅',
    earned: false,
    requirement: 'Complete 180 consecutive perfect days'
  },
  {
    id: 'year-champion',
    name: 'Year Champion',
    description: 'Completed 365 perfect days in a row!',
    icon: '🏆',
    earned: false,
    requirement: 'Complete 365 consecutive perfect days'
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
        { index: 3, condition: todayData.lectures >= 4 }, // Overachiever
        { index: 4, condition: todayData.lectures >= 5 }, // Backlog Warrior
        { index: 5, condition: todayData.lectures >= 6 }, // Super Achiever
        { index: 6, condition: todayData.lectures >= 7 }, // Maximum Effort
        { index: 7, condition: streak >= 3 }, // On Fire
        { index: 8, condition: streak >= 7 }, // Weekly Warrior
        { index: 9, condition: streak >= 14 }, // Dedication Rookie
        { index: 10, condition: streak >= 30 }, // Month Master
        { index: 11, condition: totalXP >= 100 }, // Century Club
        { index: 12, condition: totalXP >= 500 }, // XP Legend
        { index: 13, condition: totalXP >= 1000 }, // XP Titan
        { index: 14, condition: totalXP >= 2500 }, // XP Commander
        { index: 15, condition: totalXP >= 5000 }, // XP Emperor
        { index: 16, condition: totalLectures >= 25 }, // Lecture Lover
        { index: 17, condition: totalLectures >= 50 }, // Knowledge Seeker
        { index: 18, condition: totalLectures >= 100 }, // Lecture Machine
        { index: 19, condition: totalLectures >= 200 }, // Genius Level
        { index: 20, condition: totalLectures >= 365 }, // Ultimate Scholar
        { index: 21, condition: streak >= 60 }, // Consistency Champion
        { index: 22, condition: streak >= 100 }, // Persistence Hero
        { index: 23, condition: streak >= 180 }, // Half Year Champion
        { index: 24, condition: streak >= 365 }, // Year Champion
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
