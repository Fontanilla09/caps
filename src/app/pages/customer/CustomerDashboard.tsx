import React, { useState } from "react";
import { useNavigate } from "react-router";




import { VenueVisualizer } from "./VenueVisualizer";
import { BrowsePackages } from "./BrowsePackages";
import { DemoChatUI } from "./DemoChatUI";
import { ReservationCalendar } from "../components/ReservationCalendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Calendar, MessageSquare, CreditCard, Clock, MapPin, Check, AlertCircle, CheckCircle2, Info, User, Eye, Wand2, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Alert, AlertDescription } from "../../components/ui/alert";
import clsx from "clsx";

// Responsive drawer for sidebar
function Drawer({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      className={clsx(
        "fixed inset-0 z-40 flex md:hidden transition-all duration-300",
        open ? "" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 bg-black/30 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      {/* Drawer panel */}
      <aside
        className={clsx(
          "relative w-64 h-full bg-white border-r border-slate-200 flex flex-col shadow-lg transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {children}
      </aside>
    </div>
  );
}

function SettingsScreen() {
  const { verifyPassword, changePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setError("Please fill out all password fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const ok = await verifyPassword(currentPassword);
      if (!ok) {
        setError("Current password is incorrect.");
        return;
      }

      await changePassword(newPassword);
      setSuccess("Password updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch {
      setError("Unable to update password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 text-slate-900">Settings</h1>
      <p className="text-slate-600 mb-4">Update your account settings below.</p>

      <div className="flex flex-col gap-4 max-w-md">
        <Button
          variant={showChangePassword ? "default" : "outline"}
          className="justify-start text-left"
          onClick={() => setShowChangePassword((v) => !v)}
        >
          Change Password
        </Button>
        {showChangePassword && (
          <Card className="mb-2">
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your account password for better security.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block font-medium">Current Password</label>
                  <input
                    type="password"
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    autoComplete="current-password"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-medium">New Password</label>
                  <input
                    type="password"
                    className="w-full border rounded px-3 py-2"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    autoComplete="new-password"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-medium">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full border rounded px-3 py-2"
                    placeholder="Re-enter new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    autoComplete="new-password"
                    disabled={isSubmitting}
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                {success && (
                  <Alert>
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ? "Verifying..." : "Save Changes"}
                </Button>
              </form>
              <p className="text-xs text-slate-500 mt-4">
                Prototype note: current password verification is mock/local only.
              </p>
            </CardContent>
          </Card>
        )}

        <Button
          variant={showSupport ? "default" : "outline"}
          className="justify-start text-left"
          onClick={() => setShowSupport((v) => !v)}
        >
          Support & Help
        </Button>
        {showSupport && (
          <Card>
            <CardHeader>
              <CardTitle>Support & Help</CardTitle>
              <CardDescription>Need assistance? We're here to help you.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>
                  <a href="mailto:support@caterai.com" className="text-blue-700 hover:underline">Contact Support</a>
                </li>
                <li>
                  <a href="#" className="text-blue-700 hover:underline">Frequently Asked Questions (FAQ)</a>
                </li>
                <li>
                  <a href="#" className="text-blue-700 hover:underline">User Guide</a>
                </li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}


let MOCK_BOOKINGS = [
  {
    id: "1",
    package: "Elegant Wedding Package",
    caterer: "Premium Catering Co.",
    date: "2026-06-15",
    time: "18:00",
    guests: 120,
    venue: "Grand Hotel Ballroom",
    status: "confirmed",
    paymentStatus: "confirmed",
    totalPrice: 75000,
    paidAmount: 22500,
    balanceDue: 52500,
    paymentDueDate: "2026-06-08",
    paymentMethod: "GCash",
    unreadMessages: 2,
  },
  {
    id: "2",
    package: "Corporate Event Deluxe",
    caterer: "Business Events Pro",
    date: "2026-05-20",
    time: "14:00",
    guests: 75,
    venue: "City Convention Center",
    status: "pending",
    paymentStatus: "pending",
    totalPrice: 45000,
    paidAmount: 13500,
    balanceDue: 31500,
    paymentDueDate: "2026-05-13",
    paymentMethod: "Face-to-Face",
    unreadMessages: 0,
  },
];

const MOCK_MESSAGES = [
  {
    id: "1",
    bookingId: "1",
    caterer: "Premium Catering Co.",
    lastMessage: "We can definitely accommodate the dietary requirements you mentioned.",
    timestamp: "2026-05-10T14:30:00",
    unread: true,
  },
  {
    id: "2",
    bookingId: "1",
    caterer: "Premium Catering Co.",
    lastMessage: "When would you like to schedule the final tasting session?",
    timestamp: "2026-05-09T10:15:00",
    unread: true,
  },
];

export function CustomerDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");

  // Sidebar menu items
  const menu = [
    { key: "dashboard", label: "Dashboard", icon: <User className="w-5 h-5" /> },
    { key: "messages", label: "Messages", icon: <MessageSquare className="w-5 h-5" /> },
    { key: "browse", label: "Browse Package", icon: <Eye className="w-5 h-5" /> },
    { key: "visualizer", label: "Venue Visualizer", icon: <Wand2 className="w-5 h-5" /> },
    { key: "settings", label: "Settings", icon: <Info className="w-5 h-5" /> },
    { key: "logout", label: "Log Out", icon: <LogOut className="w-5 h-5" /> },
  ];

  // Content for each menu item
  const content: Record<string, React.ReactNode> = {
    dashboard: (
      <div>
        <h1 className="text-3xl font-bold mb-2 text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mb-4">Here are your booking requests:</p>
        <div className="bg-white rounded shadow p-6 max-w-2xl mb-8">
          {MOCK_BOOKINGS.length === 0 ? (
            <div className="text-slate-500">No booking requests yet.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-2"></th>
                  <th className="py-2 px-2">Package</th>
                  <th className="py-2 px-2">Caterer</th>
                  <th className="py-2 px-2">Date</th>
                  <th className="py-2 px-2">Guests</th>
                  <th className="py-2 px-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_BOOKINGS.filter((b) => b.status !== "cancelled" && b.status !== "completed").map((booking) => (
                  <tr key={booking.id} className="border-b hover:bg-blue-50">
                    <td className="py-2 px-2">
                      <button
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded flex items-center gap-1"
                        title={`Chat with ${booking.caterer}`}
                        onClick={() => {
                          const chatUser = (window as any).selectChatUserByName?.(booking.caterer);
                          if (!chatUser) {
                            setActive("messages");
                          }
                        }}
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span className="sr-only">Chat</span>
                      </button>
                    </td>
                    <td className="py-2 px-2 font-semibold">{booking.package}</td>
                    <td className="py-2 px-2">{booking.caterer}</td>
                    <td className="py-2 px-2">{booking.date}</td>
                    <td className="py-2 px-2">{booking.guests}</td>
                    <td className="py-2 px-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      {booking.status === "pending" && (
                        <button
                          className="ml-2 text-xs text-red-600 underline"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to cancel this booking?")) {
                              MOCK_BOOKINGS = MOCK_BOOKINGS.map((b) =>
                                b.id === booking.id ? { ...b, status: "cancelled" } : b
                              );
                              alert(`Booking cancelled. The caterer (${booking.caterer}) has been notified.`);
                              window.location.reload();
                            }
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {/* Reservation Calendar */}
        <ReservationCalendar />

        {/* Booking History */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-2 text-slate-900">Booking History</h2>
          <div className="bg-white rounded shadow p-6 max-w-2xl">
            {MOCK_BOOKINGS.filter((b) => b.status === "completed" || b.status === "cancelled").length === 0 ? (
              <div className="text-slate-500">No past bookings yet.</div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-2">Package</th>
                    <th className="py-2 px-2">Caterer</th>
                    <th className="py-2 px-2">Date</th>
                    <th className="py-2 px-2">Guests</th>
                    <th className="py-2 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_BOOKINGS.filter((b) => b.status === "completed" || b.status === "cancelled").map((booking) => (
                    <tr key={booking.id} className="border-b">
                      <td className="py-2 px-2 font-semibold">{booking.package}</td>
                      <td className="py-2 px-2">{booking.caterer}</td>
                      <td className="py-2 px-2">{booking.date}</td>
                      <td className="py-2 px-2">{booking.guests}</td>
                      <td className="py-2 px-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          booking.status === "completed"
                            ? "bg-gray-200 text-gray-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    ),
    messages: <DemoChatUI user={user} />, 
    settings: (
      <SettingsScreen />
    ),
    browse: <BrowsePackages />, 
    visualizer: <VenueVisualizer />, 
    logout: (
      <div>
        <h1 className="text-2xl font-bold mb-2 text-slate-900">Logged Out</h1>
        <p className="text-slate-600 mb-4">You have been logged out.</p>
      </div>
    ),
  };

  // Handle logout
  const handleMenuClick = (key: string) => {
    if (key === "logout") {
      logout();
      navigate("/login");
      setActive("logout");
    } else {
      setActive(key);
    }
    setSidebarOpen(false);
  };

  // Sidebar drawer state for mobile
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header for mobile */}
      <header className="md:hidden flex items-center justify-between h-16 px-4 border-b border-slate-200 bg-white sticky top-0 z-30">
        <button
          className="p-2 rounded hover:bg-slate-100 focus:outline-none"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
        </button>
        <span className="font-bold text-xl text-blue-700">Customer</span>
        <span className="w-8" />
      </header>

      {/* Sidebar for desktop */}
      <aside className="hidden md:fixed md:left-0 md:top-0 md:h-full md:w-64 md:bg-white md:border-r md:border-slate-200 md:flex md:flex-col md:z-20">
        <div className="h-16 flex items-center justify-center border-b border-slate-200 font-bold text-xl text-blue-700">
          Customer
        </div>
        <nav className="flex-1 flex flex-col py-6">
          {menu.map((item) => (
            <button
              key={item.key}
              className={clsx(
                "flex items-center gap-3 px-6 py-3 text-slate-700 hover:bg-blue-50 transition font-medium text-left",
                active === item.key && "bg-blue-100 text-blue-700"
              )}
              onClick={() => handleMenuClick(item.key)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Drawer for mobile */}
      <Drawer open={sidebarOpen} onClose={() => setSidebarOpen(false)}>
        <div className="h-16 flex items-center justify-center border-b border-slate-200 font-bold text-xl text-blue-700">
          Customer
        </div>
        <nav className="flex-1 flex flex-col py-6">
          {menu.map((item) => (
            <button
              key={item.key}
              className={clsx(
                "flex items-center gap-3 px-6 py-3 text-slate-700 hover:bg-blue-50 transition font-medium text-left",
                active === item.key && "bg-blue-100 text-blue-700"
              )}
              onClick={() => handleMenuClick(item.key)}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </Drawer>

      {/* Main Content */}
      <main className="md:ml-64 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          {content[active]}
        </div>
      </main>
    </div>
  );
}
