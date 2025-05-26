
import { useHabit } from '@/contexts/HabitContext';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';

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
          <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total XP</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{getTotalXP()}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Current Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{getStreak()}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Perfect Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">{perfectDays}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-yellow-500/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Completion %</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">
                {Math.round(completionRate)}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Lectures Chart */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 border-purple-500/30">
          <CardHeader>
            <CardTitle>Daily Lectures (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={last7Days}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="rgba(255,255,255,0.7)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.7)"
                    fontSize={12}
                  />
                  <Bar 
                    dataKey="lectures" 
                    fill="url(#gradient1)" 
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* XP Progress Chart */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 border-purple-500/30">
          <CardHeader>
            <CardTitle>XP Progress (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={last7Days}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="rgba(255,255,255,0.7)"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.7)"
                    fontSize={12}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="xp" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Summary */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 border-purple-500/30">
          <CardHeader>
            <CardTitle>This Week's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-500/20 rounded-lg border border-blue-500/30">
                <div className="text-2xl font-bold text-blue-400">
                  {last7Days.reduce((sum, day) => sum + day.lectures, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total Lectures</div>
              </div>
              <div className="text-center p-4 bg-green-500/20 rounded-lg border border-green-500/30">
                <div className="text-2xl font-bold text-green-400">
                  {last7Days.reduce((sum, day) => sum + day.xp, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Total XP</div>
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
