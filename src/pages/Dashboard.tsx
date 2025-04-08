
import React from 'react';
import Layout from '@/components/Layout';
import StatCard from '@/components/dashboard/StatCard';
import AssetAllocationChart from '@/components/dashboard/AssetAllocationChart';
import MonthlyExpenseChart from '@/components/dashboard/MonthlyExpenseChart';
import GoalProgressCards from '@/components/dashboard/GoalProgressCards';
import NudgesList from '@/components/dashboard/NudgesList';
import CreditScoreCard from '@/components/dashboard/CreditScoreCard';
import LoanEmiCard from '@/components/dashboard/LoanEmiCard';
import { currentUser, nudges } from '@/data/mockData';
import { CreditCard, IndianRupee, LineChart, PiggyBank, Target, Wallet, Lightbulb } from 'lucide-react';

const Dashboard = () => {
  const unreadNudgesCount = nudges.filter(n => !n.isRead).length;
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome back, {currentUser.name.split(' ')[0]}!</h1>
        <p className="text-muted-foreground">Here's a summary of your financial health</p>
      </div>
      
      {/* Top row of stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Account Balance" 
          value={`₹${currentUser.accountBalance.toLocaleString()}`}
          icon={<Wallet className="w-5 h-5 text-fintech-400" />}
          trend={{ value: 2.5, isPositive: true }}
        />
        <StatCard 
          title="Monthly Income" 
          value={`₹${currentUser.monthlyIncome.toLocaleString()}`}
          icon={<IndianRupee className="w-5 h-5 text-fintech-400" />}
        />
        <StatCard 
          title="Monthly Savings" 
          value={`₹${currentUser.monthlySaving.toLocaleString()}`}
          icon={<PiggyBank className="w-5 h-5 text-fintech-400" />}
          description={`${Math.round((currentUser.monthlySaving / currentUser.monthlyIncome) * 100)}% of income`}
        />
        <StatCard 
          title="Active Goals" 
          value="3"
          icon={<Target className="w-5 h-5 text-fintech-400" />}
          description="2 on track, 1 behind schedule"
        />
      </div>
      
      {/* Middle row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 space-y-6">
          {unreadNudgesCount > 0 && (
            <div className="bg-fintech-900/20 border border-fintech-700/30 rounded-xl p-4 animate-fade-in">
              <div className="flex items-start space-x-4">
                <div className="bg-fintech-500/20 p-2 rounded-full">
                  <Lightbulb className="w-6 h-6 text-fintech-400" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Smart Insights</h3>
                  <p className="text-muted-foreground">
                    You have {unreadNudgesCount} new financial nudges to review. 
                    They can help you optimize your finances.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AssetAllocationChart />
            <MonthlyExpenseChart />
          </div>
          
          <GoalProgressCards />
        </div>
        
        <div className="space-y-6">
          <NudgesList />
        </div>
      </div>
      
      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CreditScoreCard />
        <LoanEmiCard />
      </div>
    </Layout>
  );
};

export default Dashboard;
