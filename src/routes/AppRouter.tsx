import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { LoginPage } from "../pages/Login";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/administrator/Dashboard";
import Clients from "../pages/administrator/Clients";
import Technicians from "../pages/administrator/Technicians";
import Surveillance from "../pages/administrator/Surveillance";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="login" />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoutes>
        <Home />
      </ProtectedRoutes>
    ),
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "clients", element: <Clients /> },
      { path: "technicians", element: <Technicians /> },
      { path: "surveillance", element: <Surveillance /> },
      { path: "*", element: <Navigate to="dashboard" /> },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export const AppRouter = () => <RouterProvider router={routes} />;
