
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn } from 'lucide-react';

interface LoginFormProps {
  onLogin: (userData: any) => void;
  onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in a real app, this would call an API
    const userData = {
      id: 1,
      email,
      name: email.split('@')[0],
    };
    onLogin(userData);
  };

  return (
    <Card className="w-full backdrop-blur-sm bg-white/90 shadow-2xl border-0 animate-fade-in">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
          <LogIn className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-gray-600">
          Sign in to track your expenses
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-12 border-2 border-gray-200 focus:border-purple-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 border-2 border-gray-200 focus:border-purple-500 transition-colors"
            />
          </div>
          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Sign In
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
            >
              Sign up
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
