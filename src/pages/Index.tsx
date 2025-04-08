
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // For this demo, we'll directly show the dashboard
    // In a real app, we would check auth state here
    // navigate('/login');
  }, [navigate]);

  return <Dashboard />;
};

export default Index;
