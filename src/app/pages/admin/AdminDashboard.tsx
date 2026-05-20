import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Alert, AlertDescription } from "../../components/ui/alert";
import {
  Calendar,
  MessageSquare,
  Package,
  TrendingUp,
  DollarSign,
  Users,
  Clock,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const MOCK_STATS = {
  totalBookings: 24,
  activeBookings: 8,
  revenue: 1850000,
  avgRating: 4.8,
  upcomingEvents: 5,
  pendingMessages: 3,
};

const MOCK_UPCOMING = [
  {
    id: "1",
    customer: "Maria Santos",
    package: "Elegant Wedding Package",
    date: "2026-05-20",
    time: "18:00",
    guests: 120,
    status: "confirmed",
  },
  {
    id: "2",
    customer: "John Reyes",
    package: "Corporate Event Deluxe",
    date: "2026-05-25",
    time: "14:00",
    guests: 75,
    status: "pending",
  },
];

export function AdminDashboard() {
  const { user } = useAuth();

  if (!user?.isVerified && user?.role === "admin") {
    return (
      <div className="py-12 px-4 bg-slate-50 min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto max-w-4xl">
          <Alert className="border-amber-200 bg-amber-50">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <AlertDescription className="text-amber-900">
              <h3 className="font-medium mb-2">Account Pending Verification</h3>
              <p className="mb-4">
                Your caterer account is currently under review by our administrators. Please complete your business
                profile and ensure all required documents are submitted.
              </p>
              <Link to="/admin/profile">
                <Button variant="outline" size="sm">
                  Complete Profile
                </Button>
              </Link>
            </AlertDescription>
          </Alert>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>What Happens Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h4 className="font-medium mb-1">Complete Your Profile</h4>
                  <p className="text-sm text-slate-600">
                    Fill in your business details and upload required documents
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h4 className="font-medium mb-1">Admin Review</h4>
                  <p className="text-sm text-slate-600">
                    Our team will review your application and verify your documents
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h4 className="font-medium mb-1">Start Accepting Bookings</h4>
                  <p className="text-sm text-slate-600">
                    Once approved, you can start managing services and accepting bookings
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-slate-900">Dashboard</h1>
          <p className="text-slate-600">Welcome back, {user?.name}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Bookings</CardDescription>
              <CardTitle className="text-3xl">{MOCK_STATS.totalBookings}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Active Bookings</CardDescription>
              <CardTitle className="text-3xl">{MOCK_STATS.activeBookings}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Calendar className="w-4 h-4" />
                <span>{MOCK_STATS.upcomingEvents} upcoming events</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-3xl">₱{(MOCK_STATS.revenue / 1000).toFixed(0)}K</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <DollarSign className="w-4 h-4" />
                <span>+18% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Average Rating</CardDescription>
              <CardTitle className="text-3xl">{MOCK_STATS.avgRating}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-amber-600">
                <span>★★★★★</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid lg:grid-cols-4 gap-4 mb-8">
          <Link to="/admin/services" className="block">
            <Card className="hover:shadow-md transition cursor-pointer">
              <CardContent className="pt-6 text-center">
                <Package className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="font-medium">Manage Services</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/reservations" className="block">
            <Card className="hover:shadow-md transition cursor-pointer">
              <CardContent className="pt-6 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="font-medium">View Reservations</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/messages" className="block">
            <Card className="hover:shadow-md transition cursor-pointer relative">
              <CardContent className="pt-6 text-center">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="font-medium">Messages</p>
                {MOCK_STATS.pendingMessages > 0 && (
                  <Badge variant="destructive" className="absolute top-2 right-2 px-2 py-0.5">
                    {MOCK_STATS.pendingMessages}
                  </Badge>
                )}
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/profile" className="block">
            <Card className="hover:shadow-md transition cursor-pointer">
              <CardContent className="pt-6 text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="font-medium">Profile Settings</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events scheduled for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_UPCOMING.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {new Date(event.date).getDate()}
                      </div>
                      <div className="text-xs text-slate-600">
                        {new Date(event.date).toLocaleDateString("en-US", { month: "short" })}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium">{event.customer}</p>
                      <p className="text-sm text-slate-600">{event.package}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {event.guests} guests
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {event.status === "confirmed" ? (
                      <Badge variant="default" className="gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Confirmed
                      </Badge>
                    ) : (
                      <Badge variant="secondary">Pending</Badge>
                    )}
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
