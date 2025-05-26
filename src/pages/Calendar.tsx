
import { useState } from 'react';
import { useHabit } from '@/contexts/HabitContext';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const Calendar = () => {
  const { lectureData } = useHabit();
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  const getDayData = (day: number) => {
    const dateStr = formatDate(currentDate.getFullYear(), currentDate.getMonth(), day);
    return lectureData[dateStr] || { lectures: 0, xp: 0 };
  };

  const getDayColor = (lectures: number) => {
    if (lectures >= 3) return 'bg-green-500/30 border-green-500/50 text-green-300';
    if (lectures > 0) return 'bg-yellow-500/30 border-yellow-500/50 text-yellow-300';
    return 'bg-slate-600/30 border-slate-500/50 text-slate-400';
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white pb-20">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Calendar View
          </h1>
          <p className="text-muted-foreground">Track your progress over time</p>
        </div>

        <Card className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 border-purple-500/30">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="text-purple-300 hover:text-purple-100"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <CardTitle className="text-xl">{monthName}</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="text-purple-300 hover:text-purple-100"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for days before the month starts */}
              {Array.from({ length: firstDay }).map((_, index) => (
                <div key={`empty-${index}`} className="h-12" />
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const dayData = getDayData(day);
                const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

                return (
                  <div
                    key={day}
                    className={cn(
                      "relative h-12 border rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:scale-105",
                      getDayColor(dayData.lectures),
                      isToday && "ring-2 ring-blue-400"
                    )}
                  >
                    <div className="text-sm font-medium">{day}</div>
                    {dayData.lectures > 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center text-xs font-bold">
                        {dayData.lectures}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="bg-gradient-to-br from-slate-800/50 to-purple-800/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-lg">Legend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-500/30 border border-green-500/50 rounded"></div>
                <span className="text-sm">Perfect Day (3 lectures)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-500/30 border border-yellow-500/50 rounded"></div>
                <span className="text-sm">Good Progress (1-2 lectures)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-slate-600/30 border border-slate-500/50 rounded"></div>
                <span className="text-sm">No Progress (0 lectures)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Navigation />
    </div>
  );
};

export default Calendar;
