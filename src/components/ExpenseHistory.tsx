
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Trash2, Calendar, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Expense {
  id: number;
  amount: number;
  category: string;
  date: Date;
  description: string;
}

interface ExpenseHistoryProps {
  expenses: Expense[];
  onDeleteExpense: (id: number) => void;
}

const categoryColors = {
  'Food & Dining': 'bg-red-100 text-red-800 border-red-200',
  'Transportation': 'bg-blue-100 text-blue-800 border-blue-200',
  'Shopping': 'bg-purple-100 text-purple-800 border-purple-200',
  'Entertainment': 'bg-green-100 text-green-800 border-green-200',
  'Bills & Utilities': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Healthcare': 'bg-teal-100 text-teal-800 border-teal-200',
  'Travel': 'bg-indigo-100 text-indigo-800 border-indigo-200',
  'Education': 'bg-cyan-100 text-cyan-800 border-cyan-200',
  'Other': 'bg-gray-100 text-gray-800 border-gray-200',
};

const ExpenseHistory: React.FC<ExpenseHistoryProps> = ({ expenses, onDeleteExpense }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const { toast } = useToast();

  const filteredExpenses = expenses
    .filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expense.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || expense.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleDelete = (id: number) => {
    onDeleteExpense(id);
    toast({
      title: "Success",
      description: "Expense deleted successfully!",
    });
  };

  const categories = ['all', ...Array.from(new Set(expenses.map(e => e.category)))];

  return (
    <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold text-gray-800">
          <Calendar className="w-6 h-6 mr-2 text-indigo-500" />
          Expense History
        </CardTitle>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-2 border-gray-200 focus:border-indigo-500"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48 pl-10 border-2 border-gray-200 focus:border-indigo-500">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredExpenses.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">No expenses found</p>
              <p className="text-sm">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 transition-all duration-200 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      categoryColors[expense.category as keyof typeof categoryColors] || categoryColors.Other
                    }`}>
                      {expense.category}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(expense.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="font-medium text-gray-900">{expense.description || 'No description'}</p>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-lg font-bold text-gray-900">
                    ${expense.amount.toFixed(2)}
                  </span>
                  <Button
                    onClick={() => handleDelete(expense.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseHistory;
