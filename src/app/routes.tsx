import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landingPage/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AuthGuard from "./guard/AuthGuard";
import DashboardLayout from "../pages/layout/DashboardLayout";
import Homepage from "../pages/home/HomePage";
import AdminUsersPage from "../pages/admin/AdminPage";
import VehiclesPage from "../pages/vehicles/VehiclesPage";
import BookingPage from "../pages/booking/BookingPage";
import ResetPassword from "../pages/auth/ResetPasstword";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/home"
          element={
            <AuthGuard
              allowedRoles={[
                "admin",
                "user",
                "mechanic",
                "standard",
                "Administrativo",
                "invitado",
              ]}
            >
              <DashboardLayout>
                <Homepage />
              </DashboardLayout>
            </AuthGuard>
          }
        />
        <Route
          path="/adminUsers"
          element={
            <AuthGuard allowedRoles={["admin"]}>
              <DashboardLayout>
                <AdminUsersPage />
              </DashboardLayout>
            </AuthGuard>
          }
        />

        <Route
          path="/vehicles"
          element={
            <AuthGuard allowedRoles={["admin", "mechanic"]}>
              <DashboardLayout>
                <VehiclesPage />
              </DashboardLayout>
            </AuthGuard>
          }
        />

        <Route
          path="/booking"
          element={
            <AuthGuard allowedRoles={["admin", "mechanic"]}>
              <DashboardLayout>
                <BookingPage />
              </DashboardLayout>
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
