
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { goals } from '@/data/mockData';
import { useToast } from "@/components/ui/use-toast";
import { Calendar, Car, Clipboard, Home, Lightbulb, Plane, Plus, School, Target, Trash2 } from 'lucide-react';

interface Goal {
  id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  type: 'travel' | 'education' | 'vehicle' | 'home' | 'emergency' | 'other';
}

const goalTypeIcons = {
  travel: <Plane className="w-5 h-5" />,
  education: <School className="w-5 h-5" />,
  vehicle: <Car className="w-5 h-5" />,
  home: <Home className="w-5 h-5" />,
  emergency: <Calendar className="w-5 h-5" />,
  other: <Clipboard className="w-5 h-5" />,
};

const GoalPlanner = () => {
  const [userGoals, setUserGoals] = useState<Goal[]>(goals);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [newGoalOpen, setNewGoalOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: 100000,
    currentAmount: 0,
    deadline: '',
    type: 'travel' as Goal['type']
  });
  const { toast } = useToast();
  
  const selectedGoal = selectedGoalId 
    ? userGoals.find(goal => goal.id === selectedGoalId) 
    : userGoals[0];
  
  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline) {
      toast({
        variant: "destructive",
        title: "Missing Fields",
        description: "Please fill all required fields to create a goal.",
      });
      return;
    }
    
    const goal: Goal = {
      id: `g${Date.now()}`,
      userId: 'u1',
      ...newGoal
    };
    
    setUserGoals([...userGoals, goal]);
    setNewGoalOpen(false);
    setNewGoal({
      name: '',
      targetAmount: 100000,
      currentAmount: 0,
      deadline: '',
      type: 'travel'
    });
    
    toast({
      title: "Goal Created",
      description: `Your new goal "${goal.name}" has been added.`,
    });
  };
  
  const handleDeleteGoal = (goalId: string) => {
    setUserGoals(userGoals.filter(g => g.id !== goalId));
    if (selectedGoalId === goalId) {
      setSelectedGoalId(userGoals[0]?.id || null);
    }
    
    toast({
      title: "Goal Deleted",
      description: "Your goal has been removed.",
    });
  };
  
  const calculateMonthlyContribution = (goal: Goal) => {
    const today = new Date();
    const deadline = new Date(goal.deadline);
    const monthsLeft = (deadline.getFullYear() - today.getFullYear()) * 12 + 
                       (deadline.getMonth() - today.getMonth());
    const amountLeft = goal.targetAmount - goal.currentAmount;
    
    return monthsLeft <= 0 ? amountLeft : Math.round(amountLeft / monthsLeft);
  };
  
  const formatDeadline = (deadlineStr: string) => {
    const deadline = new Date(deadlineStr);
    return deadline.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  const calculateTimeLeft = (deadlineStr: string) => {
    const deadline = new Date(deadlineStr);
    const today = new Date();
    
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays < 30) return `${diffDays} days left`;
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} left`;
    }
    
    const years = Math.floor(diffDays / 365);
    const remainingMonths = Math.floor((diffDays % 365) / 30);
    
    if (remainingMonths === 0) {
      return `${years} year${years > 1 ? 's' : ''} left`;
    }
    
    return `${years} year${years > 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''} left`;
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Goal Planner</h1>
        <p className="text-muted-foreground">Plan, track, and achieve your financial goals</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="dashboard-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">My Goals</CardTitle>
              <Dialog open={newGoalOpen} onOpenChange={setNewGoalOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-8 bg-fintech-500 hover:bg-fintech-600">
                    <Plus className="w-4 h-4 mr-1" /> Add Goal
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Goal</DialogTitle>
                    <DialogDescription>
                      Set up a new financial goal to start tracking your progress
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="goalName">Goal Name</Label>
                      <Input 
                        id="goalName" 
                        placeholder="e.g., New Car, Europe Trip" 
                        value={newGoal.name}
                        onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="goalType">Goal Type</Label>
                      <Select 
                        value={newGoal.type} 
                        onValueChange={(value: Goal['type']) => setNewGoal({...newGoal, type: value})}
                      >
                        <SelectTrigger id="goalType">
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="travel">Travel</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="vehicle">Vehicle</SelectItem>
                          <SelectItem value="home">Home</SelectItem>
                          <SelectItem value="emergency">Emergency Fund</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="targetAmount">Target Amount (₹)</Label>
                      <Input 
                        id="targetAmount" 
                        type="number"
                        value={newGoal.targetAmount}
                        onChange={(e) => setNewGoal({...newGoal, targetAmount: Number(e.target.value)})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="currentAmount">Current Amount (₹)</Label>
                      <Input 
                        id="currentAmount" 
                        type="number"
                        value={newGoal.currentAmount}
                        onChange={(e) => setNewGoal({...newGoal, currentAmount: Number(e.target.value)})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Target Date</Label>
                      <Input 
                        id="deadline" 
                        type="date"
                        value={newGoal.deadline}
                        onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setNewGoalOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-fintech-500 hover:bg-fintech-600" onClick={handleAddGoal}>
                      Create Goal
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {userGoals.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="mb-4">No goals created yet</p>
                    <Button 
                      onClick={() => setNewGoalOpen(true)}
                      className="bg-fintech-500 hover:bg-fintech-600"
                    >
                      Create Your First Goal
                    </Button>
                  </div>
                ) : (
                  userGoals.map((goal) => {
                    const progressPercentage = Math.round((goal.currentAmount / goal.targetAmount) * 100);
                    const isSelected = goal.id === selectedGoalId || 
                                      (!selectedGoalId && goal.id === userGoals[0].id);
                    
                    return (
                      <div 
                        key={goal.id} 
                        className={`p-3 rounded-lg cursor-pointer transition-colors ${
                          isSelected 
                            ? 'bg-fintech-900/30 border border-fintech-700/50' 
                            : 'hover:bg-secondary'
                        }`}
                        onClick={() => setSelectedGoalId(goal.id)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-md ${isSelected ? 'bg-fintech-400/20' : 'bg-secondary'}`}>
                            {goalTypeIcons[goal.type]}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{goal.name}</h4>
                            <div className="flex justify-between items-center mt-1">
                              <p className="text-sm text-muted-foreground">₹{goal.targetAmount.toLocaleString()}</p>
                              <p className="text-sm font-medium text-fintech-400">{progressPercentage}%</p>
                            </div>
                            <Progress value={progressPercentage} className="h-1 mt-1" />
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          {selectedGoal ? (
            <Card className="dashboard-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-md bg-fintech-400/20">
                    {goalTypeIcons[selectedGoal.type]}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedGoal.name}</h2>
                    <p className="text-sm text-muted-foreground capitalize">{selectedGoal.type} Goal</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleDeleteGoal(selectedGoal.id)}
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground" />
                </Button>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-secondary border-none">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Target Amount</p>
                      <p className="text-2xl font-semibold">₹{selectedGoal.targetAmount.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-secondary border-none">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Current Progress</p>
                      <p className="text-2xl font-semibold">₹{selectedGoal.currentAmount.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-secondary border-none">
                    <CardContent className="p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">Remaining</p>
                      <p className="text-2xl font-semibold">
                        ₹{(selectedGoal.targetAmount - selectedGoal.currentAmount).toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Goal Progress</p>
                    <p className="text-sm font-medium">
                      {Math.round((selectedGoal.currentAmount / selectedGoal.targetAmount) * 100)}%
                    </p>
                  </div>
                  <div className="relative h-4 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-gradient-to-r from-fintech-400 to-fintech-500"
                      style={{ width: `${(selectedGoal.currentAmount / selectedGoal.targetAmount) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Goal Timeline</h3>
                    
                    <div className="bg-secondary p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Target Date</p>
                          <p className="font-medium">{formatDeadline(selectedGoal.deadline)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Time Left</p>
                          <p className="font-medium">{calculateTimeLeft(selectedGoal.deadline)}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Recommended Monthly Contribution</p>
                        <div className="flex items-center justify-between bg-background p-3 rounded-md">
                          <p className="font-semibold">₹{calculateMonthlyContribution(selectedGoal).toLocaleString()}</p>
                          <Button size="sm" className="h-7 bg-fintech-500 hover:bg-fintech-600">Set Up SIP</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary p-4 rounded-lg space-y-3">
                      <h4 className="font-medium">Recent Contributions</h4>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Monthly SIP</p>
                          <p className="font-medium">₹10,000</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Additional Deposit</p>
                          <p className="font-medium">₹5,000</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm">Monthly SIP</p>
                          <p className="font-medium">₹10,000</p>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        View All Transactions
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">AI Recommendations</h3>
                    
                    <div className="bg-fintech-900/20 border border-fintech-700/30 p-4 rounded-lg space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="bg-fintech-500/20 p-2 rounded-full">
                          <Lightbulb className="w-5 h-5 text-fintech-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">Increase your contributions</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            You're currently 8% behind on this goal. Consider increasing your monthly 
                            contribution by ₹2,000 to stay on track.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-secondary p-4 rounded-lg">
                      <h4 className="font-medium mb-3">Investment Suggestions</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-fintech-400/20 flex items-center justify-center text-xs font-medium">1</div>
                          <div>
                            <p className="font-medium">Equity Mutual Funds</p>
                            <p className="text-sm text-muted-foreground">
                              For long-term goals, allocate 60% to equity funds for higher returns.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-fintech-400/20 flex items-center justify-center text-xs font-medium">2</div>
                          <div>
                            <p className="font-medium">Debt Instruments</p>
                            <p className="text-sm text-muted-foreground">
                              Allocate 30% to debt funds for stability and steady returns.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-fintech-400/20 flex items-center justify-center text-xs font-medium">3</div>
                          <div>
                            <p className="font-medium">Fixed Deposits</p>
                            <p className="text-sm text-muted-foreground">
                              Keep 10% in FDs for liquidity and emergency access.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4 bg-fintech-500 hover:bg-fintech-600">
                        Go to Investment Allocator
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="dashboard-card h-full">
              <CardContent className="flex flex-col items-center justify-center h-full py-20 text-center">
                <Target className="w-16 h-16 mb-4 text-muted-foreground" />
                <h2 className="text-xl font-medium mb-2">No Goal Selected</h2>
                <p className="text-muted-foreground max-w-md mb-6">
                  Select a goal from the list or create a new one to view details and track your progress
                </p>
                <Button 
                  onClick={() => setNewGoalOpen(true)}
                  className="bg-fintech-500 hover:bg-fintech-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Goal
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GoalPlanner;
