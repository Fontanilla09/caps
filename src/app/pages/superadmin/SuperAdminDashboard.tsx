import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Users, Building2, Calendar, DollarSign, TrendingUp, AlertCircle } from "lucide-react";

const MOCK_STATS = {
  totalUsers: 456,
  totalCustomers: 398,
  totalCaterers: 58,
  pendingVerifications: 8,
  activeBookings: 124,
  totalRevenue: 5240000,
  revenueGrowth: 23,
};

const MOCK_RECENT_ACTIVITY = [
  {
    id: "1",
    type: "verification",
    description: "New caterer registration: Premium Catering Co.",
    timestamp: "2026-05-14T10:30:00",
  },
  {
    id: "2",
    type: "booking",
    description: "New booking: Maria Santos - Elegant Wedding Package",
    timestamp: "2026-05-14T09:15:00",
  },
  {
    id: "3",
    type: "verification",
    description: "Caterer approved: Business Events Pro",
    timestamp: "2026-05-13T16:45:00",
  },
  {
    id: "4",
    type: "user",
    description: "New customer registration: John Reyes",
    timestamp: "2026-05-13T14:20:00",
  },
];

export function SuperAdminDashboard() {
  // Filter activities to only show caterer-related (type === 'verification')
  const catererActivities = MOCK_RECENT_ACTIVITY.filter((activity) => activity.type === "verification");
  return (
    <div className="py-12 px-4 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-slate-900">Super Admin Dashboard</h1>
          <p className="text-slate-600">Platform overview and management</p>
        </div>

        {/* Stats Grid - Only Caterer Monitoring */}
        <div className="flex flex-col items-center mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Caterers</CardDescription>
                <CardTitle className="text-3xl">{MOCK_STATS.totalCaterers}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Users className="w-4 h-4" />
                  <span>{MOCK_STATS.totalCaterers} caterers</span>
                </div>
              </CardContent>
            </Card>

            <Link to="/superadmin/verification" className="block">
              <Card className="hover:shadow-md transition cursor-pointer h-full">
                <CardHeader className="pb-3">
                  <CardDescription>Pending Caterer Verifications</CardDescription>
                  <CardTitle className="text-3xl text-amber-600">{MOCK_STATS.pendingVerifications}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-amber-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>Requires attention</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Quick Actions - Only Caterer Verification */}
        <div className="mb-8 flex flex-col items-center">
          <div className="w-full max-w-2xl">
            <Link to="/superadmin/verification">
              <Card className="hover:shadow-md transition cursor-pointer">
                <CardHeader>
                  <Building2 className="w-8 h-8 mb-2 text-blue-600" />
                  <CardTitle>Caterer Verification</CardTitle>
                  <CardDescription>
                    Review and approve pending caterer applications
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Platform Activity</CardTitle>
            <CardDescription>Latest actions across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {catererActivities.map((activity) => (
                <div key={activity.id} className="flex items-start justify-between p-3 border rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
                    <div>
                      <p className="text-sm">{activity.description}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
