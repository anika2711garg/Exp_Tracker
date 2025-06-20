
import React, { useState } from 'react';
import Header from '@/components/Header';
import MonthlyComparison from '@/components/MonthlyComparison';
import ExpenseForm from '@/components/ExpenseForm';
import CategorySummary from '@/components/CategorySummary';
import AccountSelector from '@/components/AccountSelector';
import { useExpenseData } from '@/hooks/useExpenseData';

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [currentAccount, setCurrentAccount] = useState('Personal');
  const { expenses, addExpense, getMonthlyTotal, getCategoryTotals } = useExpenseData(currentAccount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header user={user} onLogout={onLogout} />
      
      <div className="container mx-auto px-4 py-8 space-y-8">
        <AccountSelector 
          currentAccount={currentAccount}
          onAccountChange={setCurrentAccount}
        />
        
        <MonthlyComparison 
          currentMonth={getMonthlyTotal(new Date())}
          lastMonth={getMonthlyTotal(new Date(new Date().getFullYear(), new Date().getMonth() - 1))}
        />
        
        <div className="grid lg:grid-cols-2 gap-8">
          <ExpenseForm onAddExpense={addExpense} />
          <CategorySummary 
            currentMonthData={getCategoryTotals(new Date())}
            lastMonthData={getCategoryTotals(new Date(new Date().getFullYear(), new Date().getMonth() - 1))}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
