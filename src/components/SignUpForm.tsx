
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CirclePlus } from 'lucide-react';

interface SignUpFormProps {
  onLogin: (userData: any) => void;
  onSwitchToLogin: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onLogin, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration - in a real app, this would call an API
    const userData = {
      id: Date.now(),
      email,
      name,
    };
    onLogin(userData);
  };

  return (
    <Card className="w-full backdrop-blur-sm bg-white/90 shadow-2xl border-0 animate-fade-in">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
          <CirclePlus className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Create Account
        </CardTitle>
        <CardDescription className="text-gray-600">
          Start tracking your expenses today
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-12 border-2 border-gray-200 focus:border-green-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 border-2 border-gray-200 focus:border-green-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 border-2 border-gray-200 focus:border-green-500 transition-colors"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Create Account
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-green-600 hover:text-green-700 font-semibold transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
