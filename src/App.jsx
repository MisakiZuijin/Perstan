import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/auth/Login"
import SignUpPage from "./pages/auth/SignUpPage"
import HomePagePembeli from "./pages/Pembeli/HomePagePembeli"
import HomePagePetani from "./pages/petani/HomePagePetani"

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
    path: "/home-petani",
    element: <HomePagePetani />,
  }
  
]) 

function App() {


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
