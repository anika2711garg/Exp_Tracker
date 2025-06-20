
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Calendar, Sparkles } from 'lucide-react';

interface MonthlyComparisonProps {
  currentMonth: number;
  lastMonth: number;
}

const MonthlyComparison: React.FC<MonthlyComparisonProps> = ({ currentMonth, lastMonth }) => {
  const difference = currentMonth - lastMonth;
  const percentageChange = lastMonth > 0 ? ((difference / lastMonth) * 100) : 0;
  const isIncrease = difference > 0;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card className="relative overflow-hidden bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-500 text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <CardHeader className="pb-4 relative z-10">
          <CardTitle className="text-xl font-medium flex items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <Calendar className="w-5 h-5" />
            </div>
            This Month
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-4xl font-bold mb-3">${currentMonth.toFixed(2)}</div>
          <div className="flex items-center text-sm">
            <Sparkles className="w-4 h-4 mr-2 text-emerald-200" />
            <span className="text-emerald-100">Current month spending</span>
          </div>
        </CardContent>
      </Card>

      <Card className="relative overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 text-white shadow-2xl border-0 transform hover:scale-105 transition-all duration-300">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <CardHeader className="pb-4 relative z-10">
          <CardTitle className="text-xl font-medium flex items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <Calendar className="w-5 h-5" />
            </div>
            Last Month
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="text-4xl font-bold mb-3">${lastMonth.toFixed(2)}</div>
          <div className="flex items-center text-sm">
            {isIncrease ? (
              <TrendingUp className="w-4 h-4 mr-2 text-red-200" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-2 text-green-200" />
            )}
            <span className={`font-medium ${isIncrease ? 'text-red-200' : 'text-green-200'}`}>
              {Math.abs(percentageChange).toFixed(1)}% {isIncrease ? 'increase' : 'decrease'} from last month
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyComparison;
