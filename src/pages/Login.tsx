
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Lock, Mail } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo login credentials for the hackathon
      if (email === 'demo@finxpert.com' && password === 'password') {
        toast({
          title: "Login Successful",
          description: "Welcome to FinXpert!",
        });
        navigate('/');
      } else {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "For demo, use: demo@finxpert.com / password",
        });
      }
    }, 1500);
  };
  
  // Demo login for quick access
  const handleDemoLogin = () => {
    setEmail('demo@finxpert.com');
    setPassword('password');
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Demo Login",
        description: "Welcome to FinXpert!",
      });
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-fintech-400">FinXpert</h1>
          <p className="text-muted-foreground mt-2">Your AI-Powered Wealth Advisor</p>
        </div>

        <Card className="shadow-xl border-border">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">Login</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-fintech-400 hover:underline">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-3">
              <Button 
                type="submit" 
                className="w-full bg-fintech-500 hover:bg-fintech-600"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full"
                onClick={handleDemoLogin}
                disabled={isLoading}
              >
                Quick Demo Login
              </Button>
              
              <div className="text-center text-sm text-muted-foreground mt-2">
                Don't have an account?{' '}
                <a href="#" className="text-fintech-400 hover:underline">
                  Sign up
                </a>
              </div>
            </CardFooter>
          </form>
        </Card>
        
        <div className="text-center text-xs text-muted-foreground">
          <p>© 2025 FinXpert. All rights reserved.</p>
          <p className="mt-1">Hackathon Demo Version</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
