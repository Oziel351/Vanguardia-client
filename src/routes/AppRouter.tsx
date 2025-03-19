import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { LoginPage } from "../pages/Login";
import { ProtectedRoutes } from "./ProtectedRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="login" />,
  },
  {
    path: "/login",
    element: <ProtectedRoutes />,
    children: [{ element: <LoginPage /> }],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export const AppRouter = () => <RouterProvider router={routes} />;
