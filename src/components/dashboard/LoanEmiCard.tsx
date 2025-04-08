
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { loans } from '@/data/mockData';
import { AlertTriangle, CreditCard } from 'lucide-react';

const LoanEmiCard = () => {
  // Get the nearest EMI
  const nearestLoan = loans.sort((a, b) => 
    new Date(a.nextEmiDate).getTime() - new Date(b.nextEmiDate).getTime()
  )[0];
  
  if (!nearestLoan) {
    return (
      <Card className="dashboard-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">Upcoming EMI</CardTitle>
        </CardHeader>
        <CardContent className="py-8 text-center text-muted-foreground">
          <p>No active loans</p>
        </CardContent>
      </Card>
    );
  }
  
  const emiDate = new Date(nearestLoan.nextEmiDate);
  const currentDate = new Date();
  const diffTime = emiDate.getTime() - currentDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const isLate = diffDays < 0;
  const isDueSoon = diffDays <= 3 && diffDays >= 0;
  
  const getStatusColor = () => {
    if (isLate) return 'text-red-500';
    if (isDueSoon) return 'text-amber-500';
    return 'text-green-500';
  };
  
  const getStatusText = () => {
    if (isLate) return `Overdue by ${Math.abs(diffDays)} days`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };
  
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Upcoming EMI</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="bg-primary/10 p-2 rounded-md">
              <CreditCard className="w-5 h-5 text-fintech-400" />
            </div>
            <div>
              <h4 className="font-medium capitalize">{nearestLoan.type} Loan</h4>
              <p className="text-sm text-muted-foreground">
                {new Date(nearestLoan.nextEmiDate).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">₹{nearestLoan.emi.toLocaleString()}</p>
            <p className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </p>
          </div>
        </div>
        
        <div className="bg-secondary p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Loan Amount</p>
              <p className="font-medium">₹{nearestLoan.amount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="font-medium">₹{nearestLoan.remainingAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Interest</p>
              <p className="font-medium">{nearestLoan.interestRate}%</p>
            </div>
          </div>
        </div>
        
        {(isLate || isDueSoon) && (
          <div className={`p-3 rounded-lg flex items-center space-x-2 ${isLate ? 'bg-red-950/20' : 'bg-amber-950/20'}`}>
            <AlertTriangle className={`w-5 h-5 ${isLate ? 'text-red-500' : 'text-amber-500'}`} />
            <p className="text-sm">
              {isLate 
                ? "Your EMI payment is overdue. Pay immediately to avoid additional charges."
                : "Your EMI payment is due soon. Ensure sufficient balance in your account."}
            </p>
          </div>
        )}
        
        <button className="w-full py-2 bg-fintech-500 hover:bg-fintech-600 text-white rounded-lg transition-colors">
          Pay Now
        </button>
      </CardContent>
    </Card>
  );
};

export default LoanEmiCard;
