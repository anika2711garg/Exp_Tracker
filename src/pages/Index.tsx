
import { useState } from 'react';
import LoginForm from '@/components/LoginForm';
import SignUpForm from '@/components/SignUpForm';
import Dashboard from '@/components/Dashboard';

const Index = () => {
  const [currentView, setCurrentView] = useState<'login' | 'signup' | 'dashboard'>('login');
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleLogin = (userData: any) => {
    setCurrentUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  if (currentView === 'dashboard' && currentUser) {
    return <Dashboard user={currentUser} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10 w-full max-w-md">
        {currentView === 'login' ? (
          <LoginForm 
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentView('signup')}
          />
        ) : (
          <SignUpForm 
            onLogin={handleLogin}
            onSwitchToLogin={() => setCurrentView('login')}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
