import { Outlet } from "react-router";
import { Navigation } from "../components/Navigation";
import { AuthProvider } from "../context/AuthContext";
import { ApplicationProvider } from "../context/ApplicationContext";

export function RootLayout() {
  return (
    <AuthProvider>
      <ApplicationProvider>
        <div className="min-h-screen flex flex-col bg-slate-50">
          <Navigation />
          <main className="flex-1">
            <Outlet />
          </main>
          <footer className="bg-slate-900 text-white py-8">
            <div className="container mx-auto px-4 text-center">
              <p>&copy; 2026 AI-Assisted Catering System. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </ApplicationProvider>
    </AuthProvider>
  );
}
