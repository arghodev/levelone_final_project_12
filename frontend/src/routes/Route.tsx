import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/home/Home";
import Error from "../components/Error";
import MenuPage from "../pages/menu/MenuPage";
import OrderPage from "../pages/order/OrderPage";
import LoginPage from "../pages/login/LoginPage";
import SignUp from "../pages/signup/SignUp";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import CartPage from "../pages/dashboard/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "menu",
        Component: MenuPage,
      },
      {
        path: "order",
        element: (
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "dashboard",
    Component: DashboardLayout,
    children: [
      {
        path: "cart",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
