import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LoginPage from "./pages/auth/Login"
import SignUpPage from "./pages/auth/SignUpPage"
import HomePagePembeli from "./pages/Pembeli/HomePagePembeli"
import HomePagePetani from "./pages/petani/HomePagePetani"
import EditProfile from "./pages/Pembeli/Profile/UserProfile"

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
