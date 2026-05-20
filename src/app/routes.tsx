import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { BrowsePackages } from "./pages/customer/BrowsePackages";
import { PackageDetails } from "./pages/customer/PackageDetails";
import { VenueVisualizer } from "./pages/customer/VenueVisualizer";
import { BookingForm } from "./pages/customer/BookingForm";
import { CustomerDashboard } from "./pages/customer/CustomerDashboard";
import { PaymentPage } from "./pages/customer/PaymentPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminServices } from "./pages/admin/AdminServices";
import { AdminReservations } from "./pages/admin/AdminReservations";
import { AdminMessages } from "./pages/admin/AdminMessages";
import { AdminProfile } from "./pages/admin/AdminProfile";
import { SuperAdminDashboard } from "./pages/superadmin/SuperAdminDashboard";
import { CatererVerification } from "./pages/superadmin/CatererVerification";
import { UserManagement } from "./pages/superadmin/UserManagement";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: LoginPage },
      { path: "register", Component: RegisterPage },

      // Customer routes
      { path: "packages", Component: BrowsePackages },
      { path: "packages/:id", Component: PackageDetails },
      { path: "visualizer", Component: VenueVisualizer },
      { path: "book/:packageId", Component: BookingForm },
      { path: "customer/dashboard", Component: CustomerDashboard },
      { path: "payment/:bookingId", Component: PaymentPage },

      // Admin/Caterer routes
      { path: "admin/dashboard", Component: AdminDashboard },
      { path: "admin/services", Component: AdminServices },
      { path: "admin/reservations", Component: AdminReservations },
      { path: "admin/messages", Component: AdminMessages },
      { path: "admin/profile", Component: AdminProfile },

      // Super Admin routes
      { path: "superadmin/dashboard", Component: SuperAdminDashboard },
      { path: "superadmin/verification", Component: CatererVerification },
      { path: "superadmin/users", Component: UserManagement },

      { path: "*", Component: NotFound },
    ],
  },
]);
