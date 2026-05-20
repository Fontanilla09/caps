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
    navigate("/");
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
            <ChefHat className="w-8 h-8 text-blue-600" />
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
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Get Started</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="flex flex-col gap-3">
              {(!isAuthenticated || user?.role === "customer") && (
                <>
                  <Link
                    to="/packages"
                    className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Browse Packages
                  </Link>
                  <Link
                    to="/visualizer"
                    className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Venue Visualizer
                  </Link>
                </>
              )}

              {isAuthenticated ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-left text-slate-700 hover:bg-slate-100 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
