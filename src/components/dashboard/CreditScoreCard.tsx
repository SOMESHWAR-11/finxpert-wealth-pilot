
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser } from '@/data/mockData';

const CreditScoreCard = () => {
  const score = currentUser.creditScore;
  const getScoreColor = () => {
    if (score >= 750) return 'text-green-500';
    if (score >= 650) return 'text-amber-500';
    return 'text-red-500';
  };
  
  const getScoreText = () => {
    if (score >= 750) return 'Excellent';
    if (score >= 700) return 'Good';
    if (score >= 650) return 'Fair';
    if (score >= 600) return 'Poor';
    return 'Very Poor';
  };
  
  // Calculate the percentage for the progress arc (300-850 range)
  const percentage = ((score - 300) / (850 - 300)) * 100;
  
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Credit Score</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-4">
        <div className="relative w-48 h-24 mb-4">
          {/* Arc background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div 
              className="absolute bottom-0 w-full h-full rounded-t-full bg-gray-700/30"
              style={{
                clipPath: 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)',
              }}
            ></div>
          </div>
          
          {/* Score arc */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div 
              className={`absolute bottom-0 w-full h-full rounded-t-full bg-gradient-to-r from-red-500 via-amber-500 to-green-500`}
              style={{
                clipPath: `polygon(0% 100%, 100% 100%, 100% ${100 - percentage}%, 0% ${100 - percentage}%)`,
              }}
            ></div>
          </div>
          
          {/* Score value */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-3xl font-bold ${getScoreColor()}`}>{score}</span>
            <span className="text-sm text-muted-foreground mt-1">{getScoreText()}</span>
          </div>
        </div>
        
        {/* Score range indicators */}
        <div className="flex justify-between w-full text-xs text-muted-foreground mt-2">
          <span>Poor</span>
          <span>Fair</span>
          <span>Good</span>
          <span>Excellent</span>
        </div>
        
        <div className="mt-6 w-full">
          <Button>View Credit Report</Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Last updated: {new Date().toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// Simple button component for this card
const Button = ({ children }: { children: React.ReactNode }) => (
  <button className="w-full py-2 bg-fintech-500 hover:bg-fintech-600 text-white rounded-lg transition-colors">
    {children}
  </button>
);

export default CreditScoreCard;
