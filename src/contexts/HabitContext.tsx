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
      // Remove the limit of 3 lectures
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
      
      // First Steps badge
      if (!newBadges[0].earned && hasCompletedLecture) {
        newBadges[0] = { ...newBadges[0], earned: true, dateEarned: new Date().toISOString() };
      }
      
      // Perfect Day badge
      if (!newBadges[3].earned && todayData.lectures >= 3) {
        newBadges[3] = { ...newBadges[3], earned: true, dateEarned: new Date().toISOString() };
      }
      
      // Streak badges
      if (!newBadges[1].earned && streak >= 3) {
        newBadges[1] = { ...newBadges[1], earned: true, dateEarned: new Date().toISOString() };
      }
      
      if (!newBadges[2].earned && streak >= 7) {
        newBadges[2] = { ...newBadges[2], earned: true, dateEarned: new Date().toISOString() };
      }
      
      // Century Club badge
      if (!newBadges[4].earned && totalXP >= 100) {
        newBadges[4] = { ...newBadges[4], earned: true, dateEarned: new Date().toISOString() };
      }
      
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
