
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { nudges } from '@/data/mockData';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'high':
      return 'bg-red-500';
    case 'medium':
      return 'bg-amber-500';
    case 'low':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

const NudgesList = () => {
  const unreadNudges = nudges.filter(nudge => !nudge.isRead).slice(0, 3);
  
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Recent Nudges</CardTitle>
          <Badge variant="secondary" className="text-fintech-400">
            {nudges.filter(n => !n.isRead).length} new
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {unreadNudges.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p>All caught up! No new nudges.</p>
          </div>
        ) : (
          unreadNudges.map((nudge) => (
            <div key={nudge.id} className="border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className={`rounded-full w-2 h-2 mt-2 ${getSeverityColor(nudge.severity)}`}></div>
                <div className="space-y-2 flex-1">
                  <p>{nudge.message}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>
                        {new Date(nudge.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short'
                        })}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                      <Button size="sm" className="bg-fintech-500 hover:bg-fintech-600">
                        Take Action
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
        
        {unreadNudges.length > 0 && (
          <Button variant="outline" className="w-full">
            View All Nudges
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default NudgesList;
