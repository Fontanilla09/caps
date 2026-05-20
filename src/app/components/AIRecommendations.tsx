import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Sparkles, TrendingUp, Users, DollarSign } from "lucide-react";

interface Recommendation {
  id: string;
  packageName: string;
  caterer: string;
  matchScore: number;
  reason: string;
  price: number;
  guestRange: string;
}

interface AIRecommendationsProps {
  eventType?: string;
  guestCount?: number;
  budget?: number;
}

export function AIRecommendations({ eventType, guestCount, budget }: AIRecommendationsProps) {
  // Mock AI recommendations based on input
  const recommendations: Recommendation[] = [
    {
      id: "1",
      packageName: "Elegant Wedding Package",
      caterer: "Premium Catering Co.",
      matchScore: 95,
      reason: "Perfect match for your event type and guest count. Highly rated by similar customers.",
      price: 75000,
      guestRange: "100-150",
    },
    {
      id: "2",
      packageName: "Garden Wedding Special",
      caterer: "Nature's Feast",
      matchScore: 88,
      reason: "Outdoor setup matches your preferences. Excellent reviews for similar events.",
      price: 68000,
      guestRange: "80-120",
    },
    {
      id: "3",
      packageName: "Grand Anniversary Package",
      caterer: "Celebration Experts",
      matchScore: 82,
      reason: "Great value for your budget with premium service. Popular choice for celebrations.",
      price: 52000,
      guestRange: "60-100",
    },
  ];

  return (
    <Card className="border-blue-200 bg-blue-50/30">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <CardTitle>AI-Powered Recommendations</CardTitle>
        </div>
        <CardDescription>
          Based on your event details, we recommend these packages
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="border-blue-100">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{rec.packageName}</h4>
                  <p className="text-sm text-slate-600">{rec.caterer}</p>
                </div>
                <Badge variant="default" className="bg-green-600 gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {rec.matchScore}% Match
                </Badge>
              </div>

              <p className="text-sm text-slate-700 mb-3">{rec.reason}</p>

              <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{rec.guestRange} guests</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>₱{rec.price.toLocaleString()}</span>
                </div>
              </div>

              <Button size="sm" className="w-full">
                View Package
              </Button>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}
