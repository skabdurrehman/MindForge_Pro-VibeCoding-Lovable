
import { useState, useEffect } from 'react';
import { useHabit } from '@/contexts/HabitContext';
import { cn } from '@/lib/utils';
import { Sparkles, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LectureTracker = () => {
  const { getTodayData, addLecture, removeLecture, checkAndAwardBadges } = useHabit();
  const [todayData, setTodayData] = useState(getTodayData());
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setTodayData(getTodayData());
    checkAndAwardBadges();
  }, [getTodayData, checkAndAwardBadges]);

  const today = new Date().toISOString().split('T')[0];

  const handleLectureClick = (index: number) => {
    const isActive = index < todayData.lectures;
    
    if (isActive) {
      removeLecture(today);
    } else if (todayData.lectures < 3) {
      addLecture(today);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600);
    }
    
    setTodayData(getTodayData());
    checkAndAwardBadges();
  };

  const resetDay = () => {
    for (let i = 0; i < todayData.lectures; i++) {
      removeLecture(today);
    }
    setTodayData(getTodayData());
  };

  const getStatusMessage = () => {
    if (todayData.lectures === 0) return "Let's get started! 🚀";
    if (todayData.lectures < 3) return "You're doing great! Keep going! 💪";
    return "Perfect day! You're amazing! ✨";
  };

  const getStatusEmoji = () => {
    if (todayData.lectures === 0) return "😴";
    if (todayData.lectures === 1) return "🌱";
    if (todayData.lectures === 2) return "🔥";
    return "🎉";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Daily Lecture Tracker
        </h2>
        <p className="text-muted-foreground">{getStatusMessage()}</p>
      </div>

      {/* Lecture Markers */}
      <div className="flex justify-center items-center space-x-6">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={cn(
              "relative w-16 h-16 rounded-full border-2 cursor-pointer transition-all duration-300 flex items-center justify-center text-2xl",
              index < todayData.lectures
                ? "bg-gradient-to-br from-green-400 to-emerald-500 border-green-300 shadow-lg shadow-green-400/50 scale-110"
                : "border-dashed border-muted-foreground/30 hover:border-primary/50 hover:scale-105",
              animate && index === todayData.lectures - 1 && "animate-bounce"
            )}
            onClick={() => handleLectureClick(index)}
          >
            {index < todayData.lectures ? (
              <span className="animate-pulse">📚</span>
            ) : (
              <span className="text-muted-foreground/50">+</span>
            )}
            
            {index < todayData.lectures && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-yellow-800" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress Info */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2 text-lg">
          <span>Lectures Done:</span>
          <span className="font-bold text-2xl">{todayData.lectures}</span>
          <span>/ 3</span>
          <span className="text-2xl">{getStatusEmoji()}</span>
        </div>

        {/* XP Display */}
        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-3 border border-blue-500/20">
          <div className="text-sm text-muted-foreground">Today's XP</div>
          <div className="text-xl font-bold text-blue-400">+{todayData.xp} XP</div>
        </div>

        {/* Reset Button */}
        {todayData.lectures > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={resetDay}
            className="text-red-500 border-red-500/20 hover:bg-red-500/10"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset Day
          </Button>
        )}
      </div>
    </div>
  );
};

export default LectureTracker;
