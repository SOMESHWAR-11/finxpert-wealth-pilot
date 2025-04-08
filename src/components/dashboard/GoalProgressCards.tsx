
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { goals } from '@/data/mockData';
import { Calendar, Car, Plane } from 'lucide-react';

const GoalIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'travel':
      return <Plane className="w-5 h-5 text-fintech-400" />;
    case 'vehicle':
      return <Car className="w-5 h-5 text-fintech-400" />;
    case 'emergency':
      return <Calendar className="w-5 h-5 text-fintech-400" />;
    default:
      return <Calendar className="w-5 h-5 text-fintech-400" />;
  }
};

const GoalProgressCards = () => {
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Goal Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {goals.map((goal) => {
          const progressPercentage = Math.round((goal.currentAmount / goal.targetAmount) * 100);
          const remainingAmount = goal.targetAmount - goal.currentAmount;
          
          // Calculate the deadline in a readable format
          const deadline = new Date(goal.deadline);
          const currentDate = new Date();
          const diffTime = Math.abs(deadline.getTime() - currentDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          const timeRemaining = diffDays > 30 
            ? `${Math.floor(diffDays / 30)} months left` 
            : `${diffDays} days left`;
          
          return (
            <div key={goal.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <GoalIcon type={goal.type} />
                  </div>
                  <div>
                    <h4 className="font-medium">{goal.name}</h4>
                    <p className="text-sm text-muted-foreground">{timeRemaining}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{goal.currentAmount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">of ₹{goal.targetAmount.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-fintech-400">{progressPercentage}% completed</span>
                  <span className="text-muted-foreground">₹{remainingAmount.toLocaleString()} to go</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default GoalProgressCards;
