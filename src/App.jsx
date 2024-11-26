import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { CartProvider } from "./pages/Pembeli/cartcontext/CartContext"
import { HistoryProvider } from "./pages/Pembeli/historycontext/HistoryContext"
import LoginPage from "./pages/auth/Login"
import SignUpPage from "./pages/auth/SignUpPage"
import HomePagePembeli from "./pages/Pembeli/HomePagePembeli"
import HomePagePetani from "./pages/petani/HomePagePetani"
import EditProfile from "./pages/Pembeli/UserProfile"
import ProductDetail from "./pages/Pembeli/ProductDetail.jsx"
import Cart from "./pages/Pembeli/Cart"
import ConfirmationPage from "./pages/Pembeli/Confirmation.jsx"
import HistoryPage from "./pages/Pembeli/History.jsx"
import ReceiptPembeli from "./pages/Pembeli/Receipt.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <SignUpPage />,
  },
  {
    path: "/home-pembeli",
    element: <HomePagePembeli />,
  },
  {
    path: "/user-profile",
    element: <EditProfile />,
  },
  {
    path: "/product-detail/:id",
    element: <ProductDetail />,
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/confirmation",
    element: <ConfirmationPage />
  },
  {
    path: "/history",
    element: <HistoryPage />
  },
  {
    path: "/receipt-pembeli",
    element: <ReceiptPembeli />
  },
  {
    path: "/home-petani",
    element: <HomePagePetani />,
  },
]);

function App() {
  return (
    <HistoryProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </HistoryProvider>
  );
}

export default App;
