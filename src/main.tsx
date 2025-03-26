import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./state/context/AuthContext";
import { AppRouter } from "./routes/AppRouter";
import { NotificationProvider } from "./state/context/NotificationContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </NotificationProvider>
  </StrictMode>
);
