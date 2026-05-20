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
    // Mock login - replace with actual API call
    // For super admin, only allow specific email
    if (role === "superadmin" && email !== "superadmin@caterai.com") {
      throw new Error("Invalid super admin credentials");
    }

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split("@")[0],
      role,
      isVerified: role !== "admin" || Math.random() > 0.5,
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));

    // Prototype-only password persistence
    localStorage.setItem("user_password", password);
  };


  const register = async (email: string, password: string, name: string, role: UserRole) => {
    // Mock registration - replace with actual API call
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role,
      isVerified: role === "customer",
    };
    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));

    // Prototype-only password persistence
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
