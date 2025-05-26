
import { useHabit } from '@/contexts/HabitContext';
import Navigation from '@/components/Navigation';
import LectureTracker from '@/components/LectureTracker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame, Target, Zap, Crown } from 'lucide-react';

const Dashboard = () => {
  const { getTotalXP, getStreak, badges } = useHabit();
  
  const earnedBadges = badges.filter(badge => badge.earned);
  const totalXP = getTotalXP();
  const currentStreak = getStreak();

  const motivationalQuotes = [
    "Every expert was once a beginner! 🌟",
    "Progress, not perfection! 💪",
    "One lecture at a time! 📚",
    "You're building your future! 🚀",
    "Knowledge is power! ⚡",
    "Consistency is key! 🗝️"
  ];

  const todayQuote = motivationalQuotes[new Date().getDay()];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pb-20">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            StudyFlow
          </h1>
          <p className="text-muted-foreground italic">"{todayQuote}"</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Zap className="w-4 h-4 mr-2 text-blue-400" />
                Total XP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{totalXP}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-red-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Flame className="w-4 h-4 mr-2 text-red-400" />
                Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">{currentStreak}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Target className="w-4 h-4 mr-2 text-green-400" />
                Daily Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">3</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-yellow-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center">
                <Crown className="w-4 h-4 mr-2 text-yellow-400" />
                Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{earnedBadges.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tracker */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 border-purple-500/30">
          <CardContent className="p-8">
            <LectureTracker />
          </CardContent>
        </Card>

        {/* Recent Badges */}
        {earnedBadges.length > 0 && (
          <Card className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 border-amber-500/30">
            <CardHeader>
              <CardTitle className="text-center">Latest Achievements 🏆</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-4">
                {earnedBadges.slice(-3).map((badge) => (
                  <div
                    key={badge.id}
                    className="text-center p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30"
                  >
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="text-xs font-medium">{badge.name}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Navigation />
    </div>
  );
};

export default Dashboard;
