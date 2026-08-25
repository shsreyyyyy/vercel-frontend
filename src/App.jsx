import React from 'react'
import { Route, Routes, useNavigate } from "react-router-dom"
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import VerifyOtp from './pages/VerifyOtp'
import Navbar from './headers/Navbar'
import Dashboard from './pages/Dashboard'
import Sidebar from './headers/Sidebar'
import { useState } from 'react'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import {api} from './api/api'
import ForgotPassword from './pages/ForgotPassword'
import VerifyForgotOtp from './pages/verifyForgotOtp'
import UpdatePassword from './pages/UpdatePassword'
import Categories from './products/categories'
import CategoryProducts from './products/categoryProducts'
import { AppProvider } from './context/cartContext'
import ViewCart from './products/viewCart'
import { UserProvider } from './context/userContext'
import Payment from './payment/payment'
import { ProductProvider } from './context/productContext'
import CategoriesSection from './products/categoriesSection'
import Wishlist from './products/Wishlist'
import { WishlistProvider } from './context/wishlistContext'
import { OrderProvider } from './context/orderContext'
import Orders from './products/order'
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.get("/youtube/user/auth-check", { withCredentials: true })
        setIsAuthenticated(true)
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message)
        setIsAuthenticated(false)
      }

    }
    checkAuth();
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return;

    const timer = setTimeout(() => {
      setIsAuthenticated(false);
      navigate("/login")
    }, 24 * 60 * 60 * 1000);
    return () => clearTimeout(timer)
  }, [isAuthenticated])

  return (
    <UserProvider isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
      <AppProvider isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
        <ProductProvider>
          <WishlistProvider>
            <OrderProvider>
              <div className='flex-col'>
                <div className='flex'>
                  <div>
                    {isAuthenticated === true && <Sidebar setIsAuthenticated={setIsAuthenticated} />}
                  </div>
                  <div className={isAuthenticated === true ? 'pl-20' : ""}>
                    <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                  </div>
                </div>
                <div className={isAuthenticated === true ? "pt-20 pl-23" : "pt-15"}>
                  <Routes>
                    {/* register login forgotPassword dashboard home */}
                    <Route path='/register' element={isAuthenticated ? <Home /> : <Register />} />
                    <Route path='/' element={isAuthenticated ? <Home /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path='/home' element={isAuthenticated ? <Home /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/login" element={isAuthenticated ? <Home /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/verify-otp" element={<VerifyOtp setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                    <Route path="/verifyForgotOtp" element={<VerifyForgotOtp />} />
                    <Route path="/updatePassword" element={<UpdatePassword />} />
                    {/* category pages */}
                    <Route path="/categories" element={isAuthenticated ? <Categories /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="//categories/:category" element={isAuthenticated ? <CategoryProducts /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/categories/categorySection" element={isAuthenticated ? <CategoriesSection /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                    {/* cart pages */}
                    <Route path="/cart/viewCart" element={isAuthenticated ? <ViewCart /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/user/cart/payment" element={isAuthenticated ? <Payment /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/product/wishlist" element={isAuthenticated ? <Wishlist /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/user/order" element={isAuthenticated ? <Orders /> : <Login setIsAuthenticated={setIsAuthenticated} />} />


                  </Routes>
                </div>
              </div>
            </OrderProvider>
          </WishlistProvider>
        </ProductProvider>
      </AppProvider>
    </UserProvider>
  )
}

export default App
