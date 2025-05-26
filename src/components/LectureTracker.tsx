
import { useState, useEffect } from 'react';
import { useHabit } from '@/contexts/HabitContext';
import { cn } from '@/lib/utils';
import { Sparkles, RotateCcw, Plus } from 'lucide-react';
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
    } else {
      addLecture(today);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 600);
    }
    
    setTodayData(getTodayData());
    checkAndAwardBadges();
  };

  const addMoreLecture = () => {
    addLecture(today);
    setAnimate(true);
    setTimeout(() => setAnimate(false), 600);
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
    if (todayData.lectures >= 3) return "Perfect! You're crushing it! ✨";
    return "Amazing work! You're unstoppable! 🔥";
  };

  const getStatusEmoji = () => {
    if (todayData.lectures === 0) return "😴";
    if (todayData.lectures === 1) return "🌱";
    if (todayData.lectures === 2) return "🔥";
    if (todayData.lectures >= 3) return "🎉";
    return "🚀";
  };

  // Create array for rendering lecture markers
  const lectureMarkers = Math.max(3, todayData.lectures + 1);

  return (
    <div className="space-y-8">
      {/* Header with Glassmorphism */}
      <div className="text-center space-y-4 p-6 rounded-3xl bg-gradient-to-br from-white/10 to-purple-500/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wide">
          Daily Lecture Tracker
        </h2>
        <p className="text-lg font-semibold text-purple-300">{getStatusMessage()}</p>
      </div>

      {/* Lecture Markers with Neumorphism */}
      <div className="flex flex-wrap justify-center items-center gap-4 p-6">
        {Array.from({ length: lectureMarkers }, (_, index) => (
          <div
            key={index}
            className={cn(
              "relative w-20 h-20 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center text-3xl font-bold",
              // Neumorphism effect
              "shadow-[8px_8px_16px_#1a1a2e,_-8px_-8px_16px_#16213e]",
              index < todayData.lectures
                ? "bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 text-white shadow-[inset_2px_2px_8px_rgba(255,255,255,0.3),_inset_-2px_-2px_8px_rgba(0,0,0,0.3)] scale-110 animate-pulse"
                : index === 2 && todayData.lectures < 3
                ? "bg-gradient-to-br from-orange-400 to-red-500 border-4 border-dashed border-orange-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(251,146,60,0.8)]"
                : "bg-gradient-to-br from-slate-700 to-slate-800 border-2 border-dashed border-slate-500 hover:border-cyan-400 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.6)]",
              animate && index === todayData.lectures - 1 && "animate-bounce"
            )}
            onClick={() => handleLectureClick(index)}
          >
            {index < todayData.lectures ? (
              <span className="animate-pulse drop-shadow-lg">📚</span>
            ) : index < 3 ? (
              <span className="text-cyan-400 text-4xl font-black">+</span>
            ) : (
              <Plus className="w-8 h-8 text-cyan-400" />
            )}
            
            {index < todayData.lectures && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-3 h-3 text-yellow-900" />
              </div>
            )}

            {/* Required marker for first 3 */}
            {index < 3 && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
            )}
          </div>
        ))}

        {/* Add more button for extra lectures */}
        {todayData.lectures >= 3 && (
          <Button
            onClick={addMoreLecture}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-[8px_8px_16px_#1a1a2e,_-8px_-8px_16px_#16213e] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all duration-300"
          >
            <Plus className="w-8 h-8" />
          </Button>
        )}
      </div>

      {/* Progress Info with Neubrutalism */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center space-x-3 text-2xl font-black p-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl shadow-[4px_4px_0px_#000] border-4 border-black transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#000] transition-all">
          <span className="text-white">Lectures Done:</span>
          <span className="text-4xl font-black text-yellow-300">{todayData.lectures}</span>
          <span className="text-white">/ 3+</span>
          <span className="text-4xl">{getStatusEmoji()}</span>
        </div>

        {/* XP Display with Glassmorphism */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 shadow-2xl">
          <div className="text-lg font-bold text-purple-300 mb-2">Today's XP Earned</div>
          <div className="text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
            +{todayData.xp} XP
          </div>
        </div>

        {/* Reset Button with Neubrutalism */}
        {todayData.lectures > 0 && (
          <Button
            variant="outline"
            onClick={resetDay}
            className="font-black text-red-500 border-4 border-red-500 bg-white hover:bg-red-500 hover:text-white shadow-[4px_4px_0px_#ef4444] hover:shadow-[2px_2px_0px_#ef4444] transform hover:translate-x-1 hover:translate-y-1 transition-all duration-200"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset Day
          </Button>
        )}
      </div>
    </div>
  );
};

export default LectureTracker;
