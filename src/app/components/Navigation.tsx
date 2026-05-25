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

          {/* Desktop Sidebar Navigation */}
          <div className="hidden md:flex flex-col items-start gap-2 min-h-screen bg-white border-r px-4 py-8 w-56 fixed left-0 top-0 z-30">
            <span className="text-lg font-bold mb-6">Customer</span>
            <Link to="/customer/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 w-full">
              <User className="w-5 h-5" /> Dashboard
            </Link>
            <Link to="/messages" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 w-full">
              <Menu className="w-5 h-5" /> Messages
            </Link>
            <Link to="/customer/browse" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 w-full">
              <ChefHat className="w-5 h-5" /> Browse Package
            </Link>
            <Link to="/customer/venue-visualizer" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 w-full">
              <ChefHat className="w-5 h-5" /> Venue Visualizer
            </Link>
            <Link to="/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-blue-100 w-full">
              <Menu className="w-5 h-5" /> Settings
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-lg text-left w-full text-blue-700 hover:bg-blue-100 hover:text-red-600 transition mt-4">
              <LogOut className="w-5 h-5" /> Log Out
            </button>
          </div>

          {/* Mobile Burger Menu Button */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-slate-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-30" onClick={() => setMobileMenuOpen(false)}>
            <div
              className="absolute top-0 left-0 w-64 h-full bg-white shadow-lg p-8 flex flex-col gap-6"
              onClick={e => e.stopPropagation()}
            >
              <span className="text-lg font-bold mb-6">Customer</span>
              <Link to="/customer/dashboard" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2 rounded-lg hover:bg-blue-100 transition">
                <User className="w-5 h-5" /> Dashboard
              </Link>
              <Link to="/messages" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2 rounded-lg hover:bg-blue-100 transition">
                <Menu className="w-5 h-5" /> Messages
              </Link>
              <Link to="/customer/browse" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2 rounded-lg hover:bg-blue-100 transition">
                <ChefHat className="w-5 h-5" /> Browse Package
              </Link>
              <Link to="/customer/venue-visualizer" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2 rounded-lg hover:bg-blue-100 transition">
                <ChefHat className="w-5 h-5" /> Venue Visualizer
              </Link>
              <Link to="/settings" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 py-2 rounded-lg hover:bg-blue-100 transition">
                <Menu className="w-5 h-5" /> Settings
              </Link>
              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 py-2 rounded-lg text-left w-full text-blue-700 hover:bg-blue-100 hover:text-red-600 transition mt-4"
              >
                <LogOut className="w-5 h-5" /> Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
