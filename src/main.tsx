import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./app/routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
