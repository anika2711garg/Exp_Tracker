
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  user: any;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ExpenseTracker
              </h1>
              <p className="text-gray-600 text-sm">Welcome back, {user.name}!</p>
            </div>
          </div>
          
          <Button
            onClick={onLogout}
            variant="outline"
            className="flex items-center space-x-2 hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
