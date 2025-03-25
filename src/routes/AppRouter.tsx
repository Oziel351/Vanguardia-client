import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { LoginPage } from "../pages/Login";
import ProtectedRoutes from "./ProtectedRoutes";
import { Home } from "../pages/Home";
import { Dashboard } from "../pages/administrator/Dashboard";
import Clients from "../pages/administrator/Clients";
import Technicians from "../pages/administrator/Technicians";
import Surveillance from "../pages/administrator/Surveillance";
import Tasks from "../pages/administrator/Tasks";

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
    element: <ProtectedRoutes children={<Home />} />,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "clients", element: <Clients /> },
      { path: "technicians", element: <Technicians /> },
      { path: "tasks", element: <Tasks /> },
      { path: "surveillance", element: <Surveillance /> },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export const AppRouter = () => <RouterProvider router={routes} />;
