
import React, { useState } from 'react';
import Header from '@/components/Header';
import MonthlyComparison from '@/components/MonthlyComparison';
import ExpenseForm from '@/components/ExpenseForm';
import CategorySummary from '@/components/CategorySummary';
import AccountSelector from '@/components/AccountSelector';
import ExpenseHistory from '@/components/ExpenseHistory';
import StatsCards from '@/components/StatsCards';
import { useExpenseData } from '@/hooks/useExpenseData';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [currentAccount, setCurrentAccount] = useState('Personal');
  const { expenses, addExpense, getMonthlyTotal, getCategoryTotals, deleteExpense } = useExpenseData(currentAccount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Financial Dashboard
          </h2>
          <p className="text-gray-600 text-lg">Track, analyze, and optimize your spending</p>
        </div>

        <AccountSelector 
          currentAccount={currentAccount}
          onAccountChange={setCurrentAccount}
        />
        
        <StatsCards expenses={expenses} />
        
        <MonthlyComparison 
          currentMonth={getMonthlyTotal(new Date())}
          lastMonth={getMonthlyTotal(new Date(new Date().getFullYear(), new Date().getMonth() - 1))}
        />
        
        <div className="grid xl:grid-cols-3 gap-8">
          <div className="xl:col-span-1">
            <ExpenseForm onAddExpense={addExpense} />
          </div>
          
          <div className="xl:col-span-2 space-y-8">
            <CategorySummary 
              currentMonthData={getCategoryTotals(new Date())}
              lastMonthData={getCategoryTotals(new Date(new Date().getFullYear(), new Date().getMonth() - 1))}
            />
            <ExpenseHistory expenses={expenses} onDeleteExpense={deleteExpense} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
