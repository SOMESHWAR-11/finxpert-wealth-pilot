
import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { currentUser } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Header = () => {
  return (
    <header className="h-16 border-b border-border px-4 md:px-6 flex items-center justify-between bg-card">
      <div className="flex items-center space-x-3">
        <div className="block md:hidden">
          <h2 className="text-xl font-bold text-fintech-400">FinXpert</h2>
        </div>
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-secondary pl-10 pr-4 py-2 rounded-lg w-[300px] text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Bell className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="hidden md:block text-right">
            <div className="text-sm font-medium">{currentUser.name}</div>
            <div className="text-xs text-muted-foreground">{currentUser.email}</div>
          </div>
          <Avatar className="h-9 w-9">
            <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
