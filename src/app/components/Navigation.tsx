import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Menu, X, ChefHat, User, LogOut } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return "/";
    switch (user.role) {
      case "customer":
        return "/customer/dashboard";
      case "admin":
        return "/admin/dashboard";
      case "superadmin":
        return "/superadmin/dashboard";
      default:
        return "/";
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold text-slate-900">CaterAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Removed Browse Packages and Venue Visualizer links as requested */}

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link to={getDashboardLink()}>
                  <Button variant="ghost" className="gap-2">
                    <User className="w-4 h-4" />
                    {user?.name}
                  </Button>
                </Link>
                <Button onClick={handleLogout} variant="outline" className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            ) : null}
          </div>

          {/* Mobile Menu Button - only for authenticated customer */}
          {isAuthenticated && user?.role === "customer" && (
            <button
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          )}
        </div>

        {/* Mobile Menu - only for authenticated customer */}
        {isAuthenticated && user?.role === "customer" && mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-30" onClick={() => setMobileMenuOpen(false)}>
            <div
              className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg p-8 flex flex-col gap-6"
              onClick={e => e.stopPropagation()}
            >
              <Link to={getDashboardLink()} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2 rounded-lg hover:bg-blue-100 transition">
                <User className="w-5 h-5" />
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link to="/messages" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2 rounded-lg hover:bg-blue-100 transition">
                <Menu className="w-5 h-5" />
                <span className="font-medium">Messages</span>
              </Link>
              <Link to="/customer/browse" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2 rounded-lg hover:bg-blue-100 transition">
                <ChefHat className="w-5 h-5" />
                <span className="font-medium">Browse Package</span>
              </Link>
              <Link to="/customer/venue-visualizer" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2 rounded-lg hover:bg-blue-100 transition">
                <ChefHat className="w-5 h-5" />
                <span className="font-medium">Venue Visualizer</span>
              </Link>
              <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2 rounded-lg hover:bg-blue-100 transition">
                <Menu className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 py-2 rounded-lg text-left w-full text-blue-700 hover:bg-blue-100 hover:text-red-600 transition"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Log Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
