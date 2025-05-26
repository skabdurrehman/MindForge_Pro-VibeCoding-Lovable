
import { useHabit } from '@/contexts/HabitContext';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const Badges = () => {
  const { badges } = useHabit();

  const earnedBadges = badges.filter(badge => badge.earned);
  const unearned = badges.filter(badge => !badge.earned);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pb-20">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Trophy Cabinet
          </h1>
          <p className="text-muted-foreground">Your collection of achievements</p>
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
            {earnedBadges.length} / {badges.length} Earned
          </Badge>
        </div>

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-green-400">🏆 Earned Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {earnedBadges.map((badge) => (
                <Card
                  key={badge.id}
                  className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 border-yellow-500/30 hover:scale-105 transition-transform duration-200"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{badge.icon}</div>
                      <div>
                        <CardTitle className="text-lg text-yellow-300">{badge.name}</CardTitle>
                        <p className="text-sm text-yellow-200/70">{badge.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">
                        Requirement: {badge.requirement}
                      </div>
                      {badge.dateEarned && (
                        <div className="text-xs text-green-400">
                          Earned: {new Date(badge.dateEarned).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Unearned Badges */}
        {unearned.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-muted-foreground">🎯 Available Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unearned.map((badge) => (
                <Card
                  key={badge.id}
                  className={cn(
                    "bg-gradient-to-br from-slate-700/50 to-slate-800/50 border-slate-600/30",
                    "hover:scale-105 transition-transform duration-200 opacity-60"
                  )}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl grayscale">{badge.icon}</div>
                      <div>
                        <CardTitle className="text-lg text-slate-300">{badge.name}</CardTitle>
                        <p className="text-sm text-slate-400">{badge.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      Requirement: {badge.requirement}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {earnedBadges.length === 0 && (
          <Card className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 border-purple-500/30">
            <CardContent className="py-12 text-center">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">Start Your Journey</h3>
              <p className="text-muted-foreground">
                Complete your first lecture to earn your first badge!
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <Navigation />
    </div>
  );
};

export default Badges;
