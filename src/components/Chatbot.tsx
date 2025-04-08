
import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { faqs } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your FinXpert assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response with a slight delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userInput: string) => {
    const normalizedInput = userInput.toLowerCase();
    
    // Check if the user's question matches any FAQ
    for (const faq of faqs) {
      if (normalizedInput.includes(faq.question.toLowerCase())) {
        return faq.answer;
      }
    }
    
    // Handle basic investment questions
    if (normalizedInput.includes('invest') || normalizedInput.includes('sip')) {
      return "Based on your risk profile and goals, I recommend starting with a mix of equity and debt funds. You can use our Investment Allocator to get a personalized recommendation.";
    }
    
    // Handle basic credit questions
    if (normalizedInput.includes('credit score') || normalizedInput.includes('loan')) {
      return "Your current credit score is 780, which is excellent! This makes you eligible for competitive loan rates. Check our Credit & Loan Advisor for personalized recommendations.";
    }
    
    // Handle basic goal planning questions
    if (normalizedInput.includes('goal') || normalizedInput.includes('plan')) {
      return "You currently have 3 active goals. Your Emergency Fund is 60% complete, Goa Trip is 54% complete, and New Bike is 25% complete. Would you like specific advice on any of these goals?";
    }
    
    // Default response
    return "I don't have a specific answer for that yet. You can check our Resources section for more information or reach out to our customer support team for personalized assistance.";
  };

  return (
    <>
      {/* Chatbot toggle button */}
      <button
        onClick={toggleChatbot}
        className={cn(
          "fixed bottom-5 right-5 z-50 p-3 rounded-full shadow-lg transition-all duration-300",
          isOpen ? "bg-red-500 rotate-0" : "bg-fintech-500 hover:bg-fintech-600"
        )}
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {/* Chatbot panel */}
      <div
        className={cn(
          "fixed bottom-20 right-5 w-80 md:w-96 bg-card rounded-xl shadow-2xl border border-border z-40 flex flex-col transition-all duration-300 ease-in-out transform",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        )}
        style={{ height: "500px", maxHeight: "70vh" }}
      >
        {/* Chatbot header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-fintech-500 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-medium">FinXpert Assistant</h3>
              <p className="text-xs text-muted-foreground">AI Powered Financial Guide</p>
            </div>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex",
                message.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] p-3 rounded-xl",
                  message.sender === 'user'
                    ? "bg-fintech-500 text-white rounded-tr-none"
                    : "bg-secondary text-foreground rounded-tl-none"
                )}
              >
                {message.content}
                <div
                  className={cn(
                    "text-xs mt-1",
                    message.sender === 'user' ? "text-fintech-100" : "text-muted-foreground"
                  )}
                >
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat input */}
        <div className="p-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Type your message..."
              className="flex-1 bg-background border border-border rounded-full py-2 px-4 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button 
              onClick={handleSendMessage} 
              size="icon" 
              className="rounded-full bg-fintech-500 hover:bg-fintech-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <div className="mt-2 text-xs text-center text-muted-foreground">
            Ask me about investments, goals, credit score, or general financial advice
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
