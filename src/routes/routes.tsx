import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AddProduct from "../pages/AddProduct";
import BikeDetails from "../pages/BikeDetails";
import CreateVariant from "../pages/CreateVariant";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Product from "../pages/Product";
import SalesOverview from "../pages/SalesOverview";
import Sell from "../pages/Sell";
import Signup from "../pages/Signup";
import Update from "../pages/Update";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/Signup",
        element: <Signup />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        ),
      },
      {
        path: "/addProduct",
        element: (
          <PrivateRoutes>
            <AddProduct />
          </PrivateRoutes>
        ),
      },
      {
        path: "/products",
        element: (
          <PrivateRoutes>
            <Product />
          </PrivateRoutes>
        ),
      },
      {
        path: "/update/:id",
        element: (
          <PrivateRoutes>
            <Update />
          </PrivateRoutes>
        ),
      },
      {
        path: "/create-variant/:id",
        element: (
          <PrivateRoutes>
            <CreateVariant />
          </PrivateRoutes>
        ),
      },
      {
        path: "/bikeDetails/:id",
        element: (
          <PrivateRoutes>
            <BikeDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "/sell/:id",
        element: (
          <PrivateRoutes>
            <Sell />
          </PrivateRoutes>
        ),
      },
      {
        path: "/sales-overview",
        element: (
          <PrivateRoutes>
            <SalesOverview />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
