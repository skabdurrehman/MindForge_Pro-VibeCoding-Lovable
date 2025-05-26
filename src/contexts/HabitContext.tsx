
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
    id: 'three-day-streak',
    name: 'On Fire',
    description: 'Maintained a 3-day streak!',
    icon: '🔥',
    earned: false,
    requirement: 'Complete 3 consecutive days'
  },
  {
    id: 'weekly-warrior',
    name: 'Weekly Warrior',
    description: 'Completed 7 days in a row!',
    icon: '⚔️',
    earned: false,
    requirement: 'Complete 7 consecutive days'
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
    id: 'century-club',
    name: 'Century Club',
    description: 'Earned 100 XP!',
    icon: '💯',
    earned: false,
    requirement: 'Earn 100 total XP'
  },
  {
    id: 'month-master',
    name: 'Month Master',
    description: 'Completed a full month!',
    icon: '👑',
    earned: false,
    requirement: 'Complete 30 consecutive days'
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
    id: 'dedication-master',
    name: 'Dedication Master',
    description: 'Completed 50 days!',
    icon: '🏆',
    earned: false,
    requirement: 'Complete 50 consecutive days'
  },
  {
    id: 'knowledge-seeker',
    name: 'Knowledge Seeker',
    description: 'Completed 100 lectures!',
    icon: '📚',
    earned: false,
    requirement: 'Complete 100 total lectures'
  },
  {
    id: 'unstoppable',
    name: 'Unstoppable',
    description: 'Completed 100 days streak!',
    icon: '💪',
    earned: false,
    requirement: 'Complete 100 consecutive days'
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
    id: 'genius-level',
    name: 'Genius Level',
    description: 'Completed 500 lectures!',
    icon: '🧠',
    earned: false,
    requirement: 'Complete 500 total lectures'
  },
  {
    id: 'year-champion',
    name: 'Year Champion',
    description: 'Completed 365 days!',
    icon: '🎖️',
    earned: false,
    requirement: 'Complete 365 consecutive days'
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
    id: 'xp-god',
    name: 'XP God',
    description: 'Reached 5000 XP!',
    icon: '🔮',
    earned: false,
    requirement: 'Earn 5000 total XP'
  },
  {
    id: 'marathon-runner',
    name: 'Marathon Runner',
    description: 'Completed 200 days streak!',
    icon: '🏃‍♂️',
    earned: false,
    requirement: 'Complete 200 consecutive days'
  },
  {
    id: 'lecture-machine',
    name: 'Lecture Machine',
    description: 'Completed 10 lectures in one day!',
    icon: '🤖',
    earned: false,
    requirement: 'Complete 10 lectures in one day'
  },
  {
    id: 'consistency-king',
    name: 'Consistency King',
    description: 'Completed 300 days streak!',
    icon: '👑',
    earned: false,
    requirement: 'Complete 300 consecutive days'
  },
  {
    id: 'xp-master',
    name: 'XP Master',
    description: 'Reached 2500 XP!',
    icon: '🎯',
    earned: false,
    requirement: 'Earn 2500 total XP'
  },
  {
    id: 'learning-legend',
    name: 'Learning Legend',
    description: 'Completed 2000 lectures!',
    icon: '📖',
    earned: false,
    requirement: 'Complete 2000 total lectures'
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
      setBadges(JSON.parse(savedBadges));
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
      
      // Check all badge conditions
      const badgeChecks = [
        { index: 0, condition: hasCompletedLecture }, // First Steps
        { index: 1, condition: streak >= 3 }, // On Fire
        { index: 2, condition: streak >= 7 }, // Weekly Warrior
        { index: 3, condition: todayData.lectures >= 3 }, // Perfect Day
        { index: 4, condition: totalXP >= 100 }, // Century Club
        { index: 5, condition: streak >= 30 }, // Month Master
        { index: 6, condition: totalXP >= 500 }, // XP Legend
        { index: 7, condition: streak >= 50 }, // Dedication Master
        { index: 8, condition: totalLectures >= 100 }, // Knowledge Seeker
        { index: 9, condition: streak >= 100 }, // Unstoppable
        { index: 10, condition: totalXP >= 1000 }, // XP Titan
        { index: 11, condition: totalLectures >= 500 }, // Genius Level
        { index: 12, condition: streak >= 365 }, // Year Champion
        { index: 13, condition: totalLectures >= 1000 }, // Ultimate Scholar
        { index: 14, condition: totalXP >= 5000 }, // XP God
        { index: 15, condition: streak >= 200 }, // Marathon Runner
        { index: 16, condition: todayData.lectures >= 10 }, // Lecture Machine
        { index: 17, condition: streak >= 300 }, // Consistency King
        { index: 18, condition: totalXP >= 2500 }, // XP Master
        { index: 19, condition: totalLectures >= 2000 }, // Learning Legend
      ];

      badgeChecks.forEach(({ index, condition }) => {
        if (!newBadges[index].earned && condition) {
          newBadges[index] = { ...newBadges[index], earned: true, dateEarned: new Date().toISOString() };
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
