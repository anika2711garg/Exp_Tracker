
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleDollarSign } from 'lucide-react';

interface CategorySummaryProps {
  currentMonthData: { [key: string]: number };
  lastMonthData: { [key: string]: number };
}

const categoryColors = {
  'Food & Dining': 'bg-gradient-to-r from-red-400 to-pink-500',
  'Transportation': 'bg-gradient-to-r from-blue-400 to-cyan-500',
  'Shopping': 'bg-gradient-to-r from-purple-400 to-violet-500',
  'Entertainment': 'bg-gradient-to-r from-green-400 to-emerald-500',
  'Bills & Utilities': 'bg-gradient-to-r from-orange-400 to-yellow-500',
  'Healthcare': 'bg-gradient-to-r from-teal-400 to-blue-500',
  'Travel': 'bg-gradient-to-r from-indigo-400 to-purple-500',
  'Education': 'bg-gradient-to-r from-cyan-400 to-teal-500',
  'Other': 'bg-gradient-to-r from-gray-400 to-slate-500',
};

const CategorySummary: React.FC<CategorySummaryProps> = ({ currentMonthData, lastMonthData }) => {
  const allCategories = Array.from(new Set([
    ...Object.keys(currentMonthData),
    ...Object.keys(lastMonthData)
  ]));

  return (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold text-gray-800">
          <CircleDollarSign className="w-6 h-6 mr-2 text-purple-500" />
          Category Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {allCategories.map((category) => {
            const currentAmount = currentMonthData[category] || 0;
            const lastAmount = lastMonthData[category] || 0;
            const colorClass = categoryColors[category as keyof typeof categoryColors] || categoryColors.Other;
            
            return (
              <div key={category} className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{category}</h4>
                  <div className={`w-4 h-4 rounded-full ${colorClass}`}></div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">This Month</p>
                    <p className="font-bold text-lg text-gray-800">₹{currentAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Last Month</p>
                    <p className="font-bold text-lg text-gray-800">₹{lastAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            );
          })}
          
          {allCategories.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No expenses recorded yet.</p>
              <p className="text-sm">Add your first expense to see category summaries!</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategorySummary;
