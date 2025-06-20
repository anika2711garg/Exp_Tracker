
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

interface MonthlyComparisonProps {
  currentMonth: number;
  lastMonth: number;
}

const MonthlyComparison: React.FC<MonthlyComparisonProps> = ({ currentMonth, lastMonth }) => {
  const difference = currentMonth - lastMonth;
  const percentageChange = lastMonth > 0 ? ((difference / lastMonth) * 100) : 0;
  const isIncrease = difference > 0;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card className="bg-gradient-to-br from-green-400 to-blue-500 text-white shadow-xl border-0 transform hover:scale-105 transition-transform duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">${currentMonth.toFixed(2)}</div>
          <p className="text-green-100 text-sm">Current month spending</p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-400 to-pink-500 text-white shadow-xl border-0 transform hover:scale-105 transition-transform duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Last Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-2">${lastMonth.toFixed(2)}</div>
          <div className="flex items-center text-sm">
            {isIncrease ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            <span className={`font-medium ${isIncrease ? 'text-red-200' : 'text-green-200'}`}>
              {Math.abs(percentageChange).toFixed(1)}% {isIncrease ? 'increase' : 'decrease'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonthlyComparison;
