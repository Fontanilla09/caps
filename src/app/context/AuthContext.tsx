import { createContext, useContext, useState, ReactNode } from "react";

type UserRole = "customer" | "admin" | "superadmin";

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;

  // Prototype-only: mock password verification/change
  verifyPassword: (password: string) => Promise<boolean>;
  changePassword: (newPassword: string) => Promise<void>;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string, role: UserRole) => {
    // Super Admin: only allow specific email
    if (role === "superadmin" && email !== "superadmin@caterai.com") {
      throw new Error("Invalid super admin credentials");
    }

    // Caterer: only allow direct login for caterer@caterai.com
    if (role === "admin") {
      if (email === "caterer@caterai.com") {
        const mockUser: User = {
          id: "caterer-demo-id",
          email,
          name: "Caterer Demo",
          role,
          isVerified: true,
        };
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        localStorage.setItem("user_password", password);
        return;
      } else {
        // All other caterers require verification
        const mockUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split("@")[0],
          role,
          isVerified: false,
        };
        setUser(mockUser);
        localStorage.setItem("user", JSON.stringify(mockUser));
        localStorage.setItem("user_password", password);
        throw new Error("Your account is pending verification by the Super Admin.");
      }
    }

    // Customer: allow all
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split("@")[0],
      role,
      isVerified: true,
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("user_password", password);
  };


  const register = async (email: string, password: string, name: string, role: UserRole) => {
    // Mock registration - replace with actual API call
    let isVerified = false;
    if (role === "customer") isVerified = true;
    if (role === "admin" && email === "caterer@caterai.com") isVerified = true;

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role,
      isVerified,
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    localStorage.setItem("user_password", password);
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("user_password");
  };

  const verifyPassword = async (password: string) => {
    const stored = localStorage.getItem("user_password");
    // Prototype-only: no hashing, no per-user storage.
    return stored !== null && password === stored;
  };

  const changePassword = async (newPassword: string) => {
    localStorage.setItem("user_password", newPassword);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        verifyPassword,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
