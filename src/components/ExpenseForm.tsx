
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CirclePlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExpenseFormProps {
  onAddExpense: (expense: any) => void;
}

const categories = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Healthcare',
  'Travel',
  'Education',
  'Other'
];

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || !category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const expense = {
      id: Date.now(),
      amount: parseFloat(amount),
      category,
      date: new Date(date),
      description,
    };

    onAddExpense(expense);
    
    // Reset form
    setAmount('');
    setCategory('');
    setDescription('');
    
    toast({
      title: "Success",
      description: "Expense added successfully!",
    });
  };

  return (
    <Card className="bg-white shadow-lg border-0">
      <CardHeader>
        <CardTitle className="flex items-center text-xl font-bold text-gray-800">
          <CirclePlus className="w-6 h-6 mr-2 text-green-500" />
          Add New Expense
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="number"
              step="0.01"
              placeholder="Amount ($)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="h-12 border-2 border-gray-200 focus:border-green-500 transition-colors"
            />
          </div>
          
          <div>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-green-500">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12 border-2 border-gray-200 focus:border-green-500 transition-colors"
            />
          </div>
          
          <div>
            <Input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-12 border-2 border-gray-200 focus:border-green-500 transition-colors"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Add Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
