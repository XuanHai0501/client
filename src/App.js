import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout";
import HomePage from "./pages/HomePage";
import AdminLayout from "./layouts/AdminLayout";
import DashboardPage from "./pages/Dashboard";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import CategoryPage from "./pages/CategoryPage";
import SearchProductPage from "./pages/SearchProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AppLayout from "./layouts/AppLayout";
import ListCategoryPage from "./pages/admin/Category/ListCategory";
import { ROUTE_PATH } from "./constant/route";
import AddCategoryPage from "./pages/admin/Category/AddCategoryPage";
import EditCategoryPage from "./pages/admin/Category/EditCategoryPage";
import ListProductPage from "./pages/admin/ProductPage/ListProductPage";
import EditProductPage from "./pages/admin/ProductPage/EditCategoryPage";
import AddProductPage from "./pages/admin/ProductPage/AddProductPage";
import ListOrderPage from "./pages/admin/Order/ListOrder";
import OrderDetailPage from "./pages/admin/Order/OrderDetail";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "",
      element: <AppLayout />,
      children: [
        {
          path: "",
          element: <ClientLayout />,
          children: [
            {
              path: "",
              element: <HomePage />,
            },
            {
              path: "auth",
              children: [
                {
                  path: "sign-in",
                  element: <SignInPage />,
                },
                {
                  path: "sign-up",
                  element: <SignUpPage />,
                },
              ],
            },
            {
              path: "product/:slug",
              element: <ProductDetailPage />,
            },
            {
              path: ROUTE_PATH.SEARCH_PRODUCT,
              element: <SearchProductPage />,
            },
            {
              path: ":categorySlug",
              element: <CategoryPage />,
            },
            {
              path: "cart",
              element: <CartPage />,
            },
          ],
        },
        {
          path: "checkout",
          element: <CheckoutPage />,
        },
        {
          // admin
          path: "admin",
          element: <AdminLayout />,
          children: [
            {
              path: "",
              element: <DashboardPage />,
            },

            // product management
            {
              path: ROUTE_PATH.PRODUCT_MANAGEMENT,
              element: <ListProductPage />,
            },
            {
              path: ROUTE_PATH.ADD_PRODUCT,
              element: <AddProductPage />,
            },
            {
              path: ROUTE_PATH.EDIT_PRODUCT_PATH,
              element: <EditProductPage />,
            },

            // category management
            {
              path: ROUTE_PATH.CATEGORY_MANAGEMENT,
              element: <ListCategoryPage />,
            },
            {
              path: ROUTE_PATH.ADD_CATEGORY,
              element: <AddCategoryPage />,
            },
            {
              path: ROUTE_PATH.EDIT_CATEGORY_PATH,
              element: <EditCategoryPage />,
            },

            // order management
            {
              path: ROUTE_PATH.ORDER_MANAGEMENT,
              element: <ListOrderPage />,
            },
            {
              path: ROUTE_PATH.ORDER_DETAIL_PATH,
              element: <OrderDetailPage />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />

      <ToastContainer />
    </>
  );
};

export default App;
