import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landingPage/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AuthGuard from "./guard/AuthGuard";
import DashboardLayout from "../pages/layout/DashboardLayout";
import Homepage from "../pages/home/HomePage";
import AdminUsersPage from "../pages/admin/AdminPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

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
            <AuthGuard
              allowedRoles={["admin", "Administrativo", "Verificador"]}
            >
              <DashboardLayout>
                <AdminUsersPage />
              </DashboardLayout>
            </AuthGuard>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
