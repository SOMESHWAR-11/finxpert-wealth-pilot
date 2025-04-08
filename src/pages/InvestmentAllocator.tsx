
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { sipGrowthData } from '@/data/mockData';
import { useToast } from "@/components/ui/use-toast";
import { BarChart, DollarSign, TrendingUp } from 'lucide-react';

const COLORS = ['#00afaf', '#4ECDC4', '#8ac4bf', '#2f9e9e', '#00cecb'];

const InvestmentAllocator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(85000);
  const [monthlySavings, setMonthlySavings] = useState(20000);
  const [riskLevel, setRiskLevel] = useState('moderate');
  const [goalType, setGoalType] = useState('wealth');
  const [sipAmount, setSipAmount] = useState(10000);
  const [allocationData, setAllocationData] = useState<{ name: string; value: number }[]>([]);
  const [calculatedSipData, setCalculatedSipData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  const { toast } = useToast();
  
  // Calculate allocation based on risk level and goal type
  useEffect(() => {
    if (riskLevel === 'conservative') {
      setAllocationData([
        { name: 'Equity', value: 30 },
        { name: 'Debt', value: 40 },
        { name: 'Gold', value: 15 },
        { name: 'Fixed Deposits', value: 15 }
      ]);
    } else if (riskLevel === 'moderate') {
      setAllocationData([
        { name: 'Equity', value: 50 },
        { name: 'Debt', value: 30 },
        { name: 'Gold', value: 10 },
        { name: 'Fixed Deposits', value: 10 }
      ]);
    } else if (riskLevel === 'aggressive') {
      setAllocationData([
        { name: 'Equity', value: 70 },
        { name: 'Debt', value: 20 },
        { name: 'Gold', value: 5 },
        { name: 'Fixed Deposits', value: 5 }
      ]);
    }
    
    // Adjust based on goal type
    if (goalType === 'retirement') {
      // Retirement goals can have slightly more equity for long-term growth
      const adjustedAllocation = [...allocationData];
      adjustedAllocation[0].value += 5; // Add 5% to equity
      adjustedAllocation[1].value -= 5; // Reduce 5% from debt
      setAllocationData(adjustedAllocation);
    } else if (goalType === 'shortTerm') {
      // Short-term goals need more stable investments
      const adjustedAllocation = [...allocationData];
      adjustedAllocation[0].value -= 10; // Reduce equity
      adjustedAllocation[3].value += 10; // Increase FDs
      setAllocationData(adjustedAllocation);
    }
  }, [riskLevel, goalType]);
  
  // Calculate SIP growth
  useEffect(() => {
    if (sipAmount && hasCalculated) {
      const baseData = sipGrowthData;
      const calculatedData = baseData.map(item => {
        const ratio = sipAmount / 10000; // Base calculation is for 10k SIP
        return {
          ...item,
          investment: item.investment * ratio,
          value: item.value * ratio
        };
      });
      setCalculatedSipData(calculatedData);
    }
  }, [sipAmount, hasCalculated]);
  
  const handleCalculate = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setHasCalculated(true);
      
      toast({
        title: "Investment Plan Generated",
        description: `Optimal allocation created for ₹${sipAmount.toLocaleString()} monthly SIP.`,
      });
    }, 1500);
  };
  
  const expectedReturns = () => {
    if (riskLevel === 'conservative') return '7-9%';
    if (riskLevel === 'moderate') return '10-12%';
    return '12-15%';
  };
  
  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Investment Allocator</h1>
        <p className="text-muted-foreground">Optimize your investments based on your financial profile</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 dashboard-card">
          <CardHeader>
            <CardTitle>Investment Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
              <Input
                id="monthlyIncome"
                type="number"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="monthlySavings">Monthly Savings (₹)</Label>
                <span className="text-sm text-muted-foreground">
                  {Math.round((monthlySavings / monthlyIncome) * 100)}% of income
                </span>
              </div>
              <Input
                id="monthlySavings"
                type="number"
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(Number(e.target.value))}
              />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>Risk Tolerance</Label>
                <span className="text-sm text-fintech-400 font-medium capitalize">{riskLevel}</span>
              </div>
              <RadioGroup 
                value={riskLevel} 
                onValueChange={setRiskLevel}
                className="flex justify-between"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="conservative" id="conservative" />
                  <Label htmlFor="conservative">Conservative</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate">Moderate</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="aggressive" id="aggressive" />
                  <Label htmlFor="aggressive">Aggressive</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-3">
              <Label>Goal Type</Label>
              <RadioGroup 
                value={goalType} 
                onValueChange={setGoalType}
                className="grid grid-cols-3 gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wealth" id="wealth" />
                  <Label htmlFor="wealth">Wealth</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="retirement" id="retirement" />
                  <Label htmlFor="retirement">Retirement</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="shortTerm" id="shortTerm" />
                  <Label htmlFor="shortTerm">Short-term</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="sipAmount">Monthly SIP Amount (₹)</Label>
                <span className="text-sm text-fintech-400 font-medium">₹{sipAmount.toLocaleString()}</span>
              </div>
              <Slider
                id="sipAmount"
                min={1000}
                max={Math.min(monthlySavings, 100000)}
                step={1000}
                value={[sipAmount]}
                onValueChange={(value) => setSipAmount(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>₹1,000</span>
                <span>₹{Math.min(monthlySavings, 100000).toLocaleString()}</span>
              </div>
            </div>
            
            <Button 
              onClick={handleCalculate}
              className="w-full bg-fintech-500 hover:bg-fintech-600"
              disabled={loading}
            >
              {loading ? "Calculating..." : "Calculate Optimal Allocation"}
            </Button>
          </CardContent>
        </Card>
        
        <div className="lg:col-span-2 space-y-6">
          {hasCalculated ? (
            <>
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>Recommended Investment Mix</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="allocation">
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
                      <TabsTrigger value="projection">Growth Projection</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="allocation" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="h-[300px] flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={allocationData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value}%`}
                                labelLine={false}
                              >
                                {allocationData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip 
                                formatter={(value: number) => [`${value}%`, 'Allocation']}
                                contentStyle={{ 
                                  backgroundColor: 'rgba(22, 22, 26, 0.9)',
                                  border: 'none',
                                  borderRadius: '8px',
                                  color: '#fff'
                                }}
                              />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        
                        <div className="flex flex-col justify-between">
                          <div>
                            <h3 className="font-medium text-lg mb-3">Allocation Details</h3>
                            <div className="space-y-3">
                              {allocationData.map((item, index) => (
                                <div key={index} className="flex justify-between items-center">
                                  <div className="flex items-center space-x-2">
                                    <div 
                                      className="w-3 h-3 rounded-full" 
                                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                    ></div>
                                    <span>{item.name}</span>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    <span className="font-medium">{item.value}%</span>
                                    <span className="text-muted-foreground">
                                      ₹{Math.round(sipAmount * (item.value / 100)).toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-4 p-4 bg-secondary rounded-lg">
                            <div className="flex items-start space-x-3">
                              <TrendingUp className="w-5 h-5 text-fintech-400 mt-1" />
                              <div>
                                <p className="font-medium">Expected Returns</p>
                                <p className="text-sm text-muted-foreground">
                                  This allocation has historically delivered {expectedReturns()} annual returns.
                                  Your results may vary based on market conditions.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="projection" className="mt-0">
                      <div className="space-y-4">
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart
                              data={calculatedSipData}
                              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                              <XAxis 
                                dataKey="year" 
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                                label={{ value: 'Years', position: 'insideBottomRight', offset: -10, fill: 'rgba(255,255,255,0.6)' }}
                              />
                              <YAxis 
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
                                tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`}
                              />
                              <Tooltip
                                formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Amount']}
                                labelFormatter={(label) => `Year ${label}`}
                                contentStyle={{ 
                                  backgroundColor: 'rgba(22, 22, 26, 0.9)',
                                  border: 'none',
                                  borderRadius: '8px',
                                  color: '#fff'
                                }}
                              />
                              <Area 
                                type="monotone" 
                                dataKey="investment" 
                                stackId="1"
                                stroke="#4ECDC4" 
                                fill="#4ECDC4" 
                                fillOpacity={0.3}
                                name="Amount Invested"
                              />
                              <Area 
                                type="monotone" 
                                dataKey="value" 
                                stackId="2"
                                stroke="#00afaf" 
                                fill="#00afaf" 
                                fillOpacity={0.6}
                                name="Expected Value"
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {calculatedSipData
                            .filter((_, index) => index === 2 || index === 4 || index === 6 || index === 7)
                            .map((item, index) => (
                              <Card key={index} className="bg-secondary border-none">
                                <CardContent className="p-4">
                                  <p className="text-sm text-muted-foreground">Year {item.year}</p>
                                  <p className="text-lg font-semibold mt-1">₹{(item.value / 100000).toFixed(1)}L</p>
                                  <p className="text-xs text-fintech-400 mt-1">
                                    {((item.value / item.investment - 1) * 100).toFixed(1)}% gain
                                  </p>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card className="dashboard-card">
                <CardHeader>
                  <CardTitle>Recommended Investment Platforms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <PlatformCard 
                      name="Groww" 
                      category="All-in-one" 
                      description="Stocks, Mutual Funds, US Stocks"
                      features={["Zero commission", "Easy onboarding", "Detailed analytics"]}
                    />
                    <PlatformCard 
                      name="Zerodha" 
                      category="Stocks & Mutual Funds" 
                      description="Advanced trading features"
                      features={["Low brokerage", "Powerful charts", "Expert insights"]}
                    />
                    <PlatformCard 
                      name="Kuvera" 
                      category="Mutual Funds" 
                      description="Focus on goal-based investing"
                      features={["Direct plans", "Tax harvesting", "Goal tracking"]}
                    />
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center space-y-4 p-12 text-center">
              <div className="bg-primary/10 p-4 rounded-full">
                <BarChart className="w-12 h-12 text-fintech-400" />
              </div>
              <h2 className="text-xl font-medium">Calculate Your Optimal Investment Plan</h2>
              <p className="text-muted-foreground max-w-md">
                Fill in your financial details on the left and click "Calculate" to get a 
                personalized investment allocation recommendation based on your risk profile and goals.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

interface PlatformCardProps {
  name: string;
  category: string;
  description: string;
  features: string[];
}

const PlatformCard = ({ name, category, description, features }: PlatformCardProps) => {
  return (
    <div className="bg-secondary rounded-lg p-4 hover:bg-secondary/80 transition-colors">
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          <DollarSign className="w-5 h-5 text-fintech-400" />
        </div>
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{category}</p>
        </div>
      </div>
      
      <p className="text-sm mb-3">{description}</p>
      
      <ul className="space-y-1">
        {features.map((feature, index) => (
          <li key={index} className="text-xs text-muted-foreground flex items-center space-x-1">
            <span className="w-1 h-1 bg-fintech-400 rounded-full"></span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button className="w-full mt-3 bg-fintech-500 hover:bg-fintech-600 h-8 text-xs">
        Visit Platform
      </Button>
    </div>
  );
};

export default InvestmentAllocator;
