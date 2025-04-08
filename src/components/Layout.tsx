
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Chatbot from './Chatbot';
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex h-screen overflow-hidden">
      {!isMobile && <Sidebar />}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto bg-background">
          {children}
        </main>
        {isMobile && <MobileNav />}
      </div>
      <Chatbot />
    </div>
  );
};

const MobileNav = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-2 py-3 flex justify-around z-10">
      <NavItem icon="home" label="Home" isActive />
      <NavItem icon="bar-chart" label="Invest" />
      <NavItem icon="target" label="Goals" />
      <NavItem icon="bell" label="Nudges" />
      <NavItem icon="credit-card" label="Credit" />
    </div>
  );
};

const NavItem = ({ icon, label, isActive = false }: { icon: string; label: string; isActive?: boolean }) => {
  return (
    <div className={`flex flex-col items-center ${isActive ? 'text-fintech-400' : 'text-muted-foreground'}`}>
      <i className={`lucide lucide-${icon} w-5 h-5`}></i>
      <span className="text-xs mt-1">{label}</span>
    </div>
  );
};

export default Layout;
