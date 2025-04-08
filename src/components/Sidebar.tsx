
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, BarChart2, Target, Bell, CreditCard, User, Settings, HelpCircle } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

const NavItem = ({ icon, label, href, isActive = false }: NavItemProps) => {
  return (
    <Link 
      to={href} 
      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        isActive 
          ? 'bg-sidebar-accent text-fintech-400' 
          : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-fintech-300'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-sidebar flex flex-col border-r border-border">
      <div className="h-16 border-b border-border flex items-center px-6">
        <h1 className="text-2xl font-bold text-fintech-400">FinXpert</h1>
      </div>
      
      <div className="flex-1 py-6 flex flex-col justify-between">
        <div className="space-y-1 px-3">
          <NavItem 
            icon={<Home className="w-5 h-5" />} 
            label="Dashboard" 
            href="/"
            isActive={true}
          />
          <NavItem 
            icon={<BarChart2 className="w-5 h-5" />} 
            label="Investments" 
            href="/investments"
          />
          <NavItem 
            icon={<Target className="w-5 h-5" />} 
            label="Goals" 
            href="/goals"
          />
          <NavItem 
            icon={<Bell className="w-5 h-5" />} 
            label="Nudges" 
            href="/nudges"
          />
          <NavItem 
            icon={<CreditCard className="w-5 h-5" />} 
            label="Credit & Loans" 
            href="/credit"
          />
          <NavItem 
            icon={<User className="w-5 h-5" />} 
            label="Profile" 
            href="/profile"
          />
        </div>
        
        <div className="space-y-1 px-3">
          <NavItem 
            icon={<Settings className="w-5 h-5" />} 
            label="Settings" 
            href="/settings"
          />
          <NavItem 
            icon={<HelpCircle className="w-5 h-5" />} 
            label="Help & Support" 
            href="/help"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
