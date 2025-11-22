import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/landingPage/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {}
      </Routes>
    </BrowserRouter>
  );
}
