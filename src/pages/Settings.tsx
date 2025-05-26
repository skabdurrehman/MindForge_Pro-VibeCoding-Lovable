
import { useState } from 'react';
import { useTheme } from '@/components/ThemeProvider';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Moon, Sun, Download, Trash2, Volume2, VolumeX } from 'lucide-react';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const exportData = () => {
    const data = {
      lectureData: JSON.parse(localStorage.getItem('habit-tracker-data') || '{}'),
      badges: JSON.parse(localStorage.getItem('habit-tracker-badges') || '[]'),
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `studyflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetAllData = () => {
    localStorage.removeItem('habit-tracker-data');
    localStorage.removeItem('habit-tracker-badges');
    setShowConfirmReset(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pb-20">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Settings
          </h1>
          <p className="text-muted-foreground">Customize your experience</p>
        </div>

        {/* Appearance */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 border-purple-500/30">
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <div>
                  <div className="font-medium">Theme</div>
                  <div className="text-sm text-muted-foreground">Choose your preferred theme</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('light')}
                >
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTheme('dark')}
                >
                  Dark
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Audio */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 border-purple-500/30">
          <CardHeader>
            <CardTitle>Audio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                <div>
                  <div className="font-medium">Sound Effects</div>
                  <div className="text-sm text-muted-foreground">Play sounds when completing lectures</div>
                </div>
              </div>
              <Switch
                checked={soundEnabled}
                onCheckedChange={setSoundEnabled}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 border-purple-500/30">
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Download className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="font-medium">Export Data</div>
                  <div className="text-sm text-muted-foreground">Download your progress as JSON</div>
                </div>
              </div>
              <Button onClick={exportData} variant="outline" size="sm">
                Export
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Trash2 className="w-5 h-5 text-red-400" />
                <div>
                  <div className="font-medium">Reset All Data</div>
                  <div className="text-sm text-muted-foreground">Clear all progress and badges</div>
                </div>
              </div>
              <Button 
                onClick={() => setShowConfirmReset(true)} 
                variant="outline" 
                size="sm"
                className="text-red-400 border-red-400/30 hover:bg-red-500/10"
              >
                Reset
              </Button>
            </div>

            {showConfirmReset && (
              <Card className="bg-red-500/10 border-red-500/30">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <div className="text-red-400 font-medium">
                      Are you sure you want to reset all data?
                    </div>
                    <div className="text-sm text-muted-foreground">
                      This action cannot be undone. All your progress, XP, and badges will be lost.
                    </div>
                    <div className="flex space-x-3 justify-center">
                      <Button
                        onClick={() => setShowConfirmReset(false)}
                        variant="outline"
                        size="sm"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={resetAllData}
                        variant="destructive"
                        size="sm"
                      >
                        Yes, Reset All
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {/* About */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 border-purple-500/30">
          <CardHeader>
            <CardTitle>About StudyFlow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>Version 1.0.0</p>
              <p>A gamified habit tracker designed for students and self-learners.</p>
              <p>Built with React, TypeScript, and Tailwind CSS.</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};

export default Settings;
