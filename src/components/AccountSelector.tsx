
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AccountSelectorProps {
  currentAccount: string;
  onAccountChange: (account: string) => void;
}

const accounts = ['Personal', 'Business', 'Family'];

const AccountSelector: React.FC<AccountSelectorProps> = ({ currentAccount, onAccountChange }) => {
  return (
    <Card className="bg-white shadow-lg border-0">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Account</h3>
        <div className="flex flex-wrap gap-3">
          {accounts.map((account) => (
            <Button
              key={account}
              onClick={() => onAccountChange(account)}
              variant={currentAccount === account ? "default" : "outline"}
              className={`
                transition-all duration-300 transform hover:scale-105
                ${currentAccount === account 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                  : 'hover:bg-purple-50 hover:border-purple-300'
                }
              `}
            >
              {account}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSelector;
