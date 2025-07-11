import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/home/Home";
import Error from "../components/Error";
import MenuPage from "../pages/menu/MenuPage";
import OrderPage from "../pages/order/OrderPage";
import LoginPage from "../pages/login/LoginPage";
import SignUp from "../pages/signup/SignUpPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import CartPage from "../pages/dashboard/Cart";
import AllUsers from "../pages/dashboard/AllUsers";
import AddItemPage from "../pages/dashboard/AddItem";
import AdminRoute from "./AdminRoute";
import ManageItem from "../pages/dashboard/ManageItem";
import Payment from "../pages/dashboard/Payment";
import UpdaateItem from "../pages/dashboard/UpdatedItem";

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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // normal user
      {
        path: "cart",
        Component: CartPage,
      },

      // admin
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            {" "}
            <AllUsers />{" "}
          </AdminRoute>
        ),
      },
      {
        path: "addItem",
        element: (
          <AdminRoute>
            <AddItemPage />
          </AdminRoute>
        ),
      },
      {
        path: "manageItems",
        element: (
          <AdminRoute>
            <ManageItem />
          </AdminRoute>
        ),
      },
      {
        path: "updateItem/:id",
        element: (
          <AdminRoute>
            <UpdaateItem />
          </AdminRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/menu/${params.id}`),
      },
      {
        path: "payment",
        element: (
          <AdminRoute>
            <Payment />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
