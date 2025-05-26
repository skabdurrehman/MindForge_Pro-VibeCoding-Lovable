
import { useHabit } from '@/contexts/HabitContext';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';

const Progress = () => {
  const { lectureData, getTotalXP, getStreak } = useHabit();

  // Prepare data for charts
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split('T')[0];
    const dayData = lectureData[dateStr] || { lectures: 0, xp: 0 };
    
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      lectures: dayData.lectures,
      xp: dayData.xp,
    };
  });

  const totalDays = Object.keys(lectureData).length;
  const perfectDays = Object.values(lectureData).filter(day => day.lectures >= 3).length;
  const completionRate = totalDays > 0 ? (perfectDays / totalDays) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pb-20">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Progress Analytics
          </h1>
          <p className="text-muted-foreground">Track your learning journey</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30 backdrop-blur-xl shadow-[8px_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] transition-all duration-300 transform hover:scale-105">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total XP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">{getTotalXP()}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30 backdrop-blur-xl shadow-[8px_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all duration-300 transform hover:scale-105">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Current Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">{getStreak()}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30 backdrop-blur-xl shadow-[8px_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition-all duration-300 transform hover:scale-105">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Perfect Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">{perfectDays}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-yellow-500/30 backdrop-blur-xl shadow-[8px_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.6)] transition-all duration-300 transform hover:scale-105">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Completion %</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-400">
                {Math.round(completionRate)}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced 3D-style Daily Lectures Chart */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 border-4 border-purple-500/50 shadow-[8px_8px_0px_#7c3aed,16px_16px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              📊 Daily Lectures (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 p-4 bg-gradient-to-br from-slate-900/50 to-purple-900/30 rounded-2xl border border-purple-500/30">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={last7Days} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity={1}/>
                      <stop offset="50%" stopColor="#A855F7" stopOpacity={0.8}/>
                      <stop offset="100%" stopColor="#C084FC" stopOpacity={0.6}/>
                    </linearGradient>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="4" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.3"/>
                    </filter>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(139,92,246,0.2)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="rgba(255,255,255,0.8)"
                    fontSize={14}
                    fontWeight="bold"
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.8)"
                    fontSize={14}
                    fontWeight="bold"
                  />
                  <Bar 
                    dataKey="lectures" 
                    fill="url(#barGradient)"
                    radius={[8, 8, 0, 0]}
                    filter="url(#shadow)"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced 3D-style XP Progress Chart */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-green-800/30 border-4 border-green-500/50 shadow-[8px_8px_0px_#10b981,16px_16px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              ⚡ XP Progress (Last 7 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 p-4 bg-gradient-to-br from-slate-900/50 to-green-900/30 rounded-2xl border border-green-500/30">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={last7Days} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                    </linearGradient>
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.2)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="rgba(255,255,255,0.8)"
                    fontSize={14}
                    fontWeight="bold"
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.8)"
                    fontSize={14}
                    fontWeight="bold"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="xp" 
                    stroke="#10B981" 
                    strokeWidth={4}
                    fill="url(#areaGradient)"
                    filter="url(#glow)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Weekly Summary */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-amber-800/30 border-4 border-amber-500/50 shadow-[8px_8px_0px_#f59e0b,16px_16px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-xl font-black bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
              📈 This Week's Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl border-2 border-blue-500/50 backdrop-blur-xl shadow-[4px_4px_16px_rgba(0,0,0,0.3)]">
                <div className="text-4xl font-black text-blue-400 mb-2">
                  {last7Days.reduce((sum, day) => sum + day.lectures, 0)}
                </div>
                <div className="text-lg font-bold text-blue-300">Total Lectures</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-2xl border-2 border-green-500/50 backdrop-blur-xl shadow-[4px_4px_16px_rgba(0,0,0,0.3)]">
                <div className="text-4xl font-black text-green-400 mb-2">
                  {last7Days.reduce((sum, day) => sum + day.xp, 0)}
                </div>
                <div className="text-lg font-bold text-green-300">Total XP</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};

export default Progress;
