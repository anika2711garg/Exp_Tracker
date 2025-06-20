
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CirclePlus, DollarSign, Tag, Calendar as CalendarIcon, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExpenseFormProps {
  onAddExpense: (expense: any) => void;
}

const categories = [
  { name: 'Food & Dining', icon: '🍽️' },
  { name: 'Transportation', icon: '🚗' },
  { name: 'Shopping', icon: '🛍️' },
  { name: 'Entertainment', icon: '🎬' },
  { name: 'Bills & Utilities', icon: '💡' },
  { name: 'Healthcare', icon: '🏥' },
  { name: 'Travel', icon: '✈️' },
  { name: 'Education', icon: '📚' },
  { name: 'Other', icon: '📦' }
];

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const expense = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      date: new Date(date),
      description,
    };

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    onAddExpense(expense);
    
    // Reset form
    setAmount('');
    setCategory('');
    setDescription('');
    setIsSubmitting(false);
    
    toast({
      title: "Success! 🎉",
      description: "Expense added successfully!",
    });
  };

  return (
    <Card className="bg-gradient-to-br from-white via-purple-50 to-pink-50 shadow-xl border-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500"></div>
      
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center text-xl font-bold text-gray-800">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mr-3 shadow-lg">
            <CirclePlus className="w-5 h-5 text-white" />
          </div>
          Add New Expense
        </CardTitle>
        <p className="text-gray-600 mt-2">Track your spending with detailed categorization</p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Amount *
            </label>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="h-12 border-2 border-gray-200 focus:border-emerald-500 transition-colors text-lg font-medium pl-4"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Tag className="w-4 h-4 inline mr-1" />
              Category *
            </label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-emerald-500">
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>
                    <div className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <CalendarIcon className="w-4 h-4 inline mr-1" />
              Date
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12 border-2 border-gray-200 focus:border-emerald-500 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-1" />
              Description
            </label>
            <Input
              type="text"
              placeholder="What did you spend on?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-12 border-2 border-gray-200 focus:border-emerald-500 transition-colors"
            />
          </div>
          
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full h-14 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Adding Expense...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CirclePlus className="w-5 h-5" />
                Add Expense
              </div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
