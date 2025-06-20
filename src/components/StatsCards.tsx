
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, TrendingUp, Target, CreditCard } from 'lucide-react';

interface StatsCardsProps {
  expenses: any[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ expenses }) => {
  const currentMonth = new Date();
  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth.getMonth() && 
           expenseDate.getFullYear() === currentMonth.getFullYear();
  });

  const totalThisMonth = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const avgPerDay = currentMonthExpenses.length > 0 ? totalThisMonth / new Date().getDate() : 0;
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const transactionCount = currentMonthExpenses.length;

  const stats = [
    {
      title: "This Month",
      value: `₹${totalThisMonth.toFixed(2)}`,
      icon: DollarSign,
      gradient: "from-emerald-400 to-cyan-400",
      bgGradient: "from-emerald-50 to-cyan-50"
    },
    {
      title: "Daily Average",
      value: `₹${avgPerDay.toFixed(2)}`,
      icon: TrendingUp,
      gradient: "from-purple-400 to-pink-400",
      bgGradient: "from-purple-50 to-pink-50"
    },
    {
      title: "Total Spent",
      value: `₹${totalExpenses.toFixed(2)}`,
      icon: Target,
      gradient: "from-orange-400 to-red-400",
      bgGradient: "from-orange-50 to-red-50"
    },
    {
      title: "Transactions",
      value: transactionCount.toString(),
      icon: CreditCard,
      gradient: "from-blue-400 to-indigo-400",
      bgGradient: "from-blue-50 to-indigo-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-gradient-to-br ${stat.bgGradient}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.gradient} flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
