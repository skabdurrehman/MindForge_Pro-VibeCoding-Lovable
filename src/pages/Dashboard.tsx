
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

  const todayQuote = "Koshish jaari rakh, Zaroor safal tera kaam hoga, Kadmo me there Jahan aur sabse upar tera Naam hoga.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pb-20">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header with enhanced styling */}
        <div className="text-center space-y-4 p-6 rounded-3xl bg-gradient-to-br from-white/10 to-purple-500/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent tracking-wider">
            MindForge Pro
          </h1>
          <p className="text-purple-300 italic font-semibold text-lg leading-relaxed max-w-2xl mx-auto">
            "{todayQuote}"
          </p>
        </div>

        {/* Stats Cards with enhanced effects */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-2 border-blue-500/30 backdrop-blur-xl shadow-[8px_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-300 transform hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-black flex items-center text-blue-300">
                <Zap className="w-6 h-6 mr-3 text-blue-400" />
                Total XP
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">
                {totalXP}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/20 to-orange-500/20 border-2 border-red-500/30 backdrop-blur-xl shadow-[8px_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] transition-all duration-300 transform hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-black flex items-center text-red-300">
                <Flame className="w-6 h-6 mr-3 text-red-400" />
                Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-transparent bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text">
                {currentStreak}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/30 backdrop-blur-xl shadow-[8px_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all duration-300 transform hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-black flex items-center text-green-300">
                <Target className="w-6 h-6 mr-3 text-green-400" />
                Daily Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-transparent bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text">
                3 Lectures
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-2 border-yellow-500/30 backdrop-blur-xl shadow-[8px_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all duration-300 transform hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-black flex items-center text-yellow-300">
                <Crown className="w-6 h-6 mr-3 text-yellow-400" />
                Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text">
                {earnedBadges.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tracker with Neubrutalism */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 border-4 border-purple-500 shadow-[8px_8px_0px_#7c3aed] transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_#7c3aed] transition-all duration-300">
          <CardContent className="p-8">
            <LectureTracker />
          </CardContent>
        </Card>

        {/* Recent Badges with Glassmorphism */}
        {earnedBadges.length > 0 && (
          <Card className="bg-gradient-to-br from-amber-500/20 to-yellow-500/20 backdrop-blur-xl border-2 border-amber-500/30 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-black text-transparent bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text">
                Latest Achievements 🏆
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-6">
                {earnedBadges.slice(-3).map((badge) => (
                  <div
                    key={badge.id}
                    className="text-center p-4 bg-gradient-to-br from-yellow-500/30 to-amber-500/30 rounded-2xl border-2 border-yellow-500/50 backdrop-blur-xl shadow-[4px_4px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_20px_rgba(245,158,11,0.8)] transform hover:scale-110 transition-all duration-300"
                  >
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <div className="text-sm font-bold text-yellow-200">{badge.name}</div>
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
