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

          {/* Mobile Menu Button removed */}
        </div>

        {/* Mobile Menu removed */}
      </div>
    </nav>
  );
}
