import React, { useContext,useEffect, } from 'react'
import { AppContext } from '../context/cartContext'
import { WishlistContext } from '../context/wishlistContext'
import { OrderContext } from '../context/orderContext'
import { UserContext } from '../context/userContext'

const Dashboard = () => {
  const {count}=useContext(AppContext)
  const {getWishlist,wishlist}=useContext(WishlistContext)
  const { orders, getOrders } = useContext(OrderContext);
  const { user, getProfile, loading,logoutHandler } = useContext(UserContext);

  useEffect(() => {
    getProfile();
  }, []);

useEffect(() => {
    getOrders();
}, []);
  useEffect(() => {
    getWishlist()
  }, [])

  return (
     <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto py-10 px-6">

        <h1 className="text-4xl font-bold mb-8">
          Dashboard
        </h1>

        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold">
              Orders
            </h2>

            <p className="text-4xl mt-3 font-bold text-blue-600">
              {orders.length}
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold">
              Cart
            </h2>

            <p className="text-4xl mt-3 font-bold text-green-600">
              {count}
            </p>
          </div>

          <div className="bg-white shadow rounded-xl p-6">
            <h2 className="text-xl font-semibold">
              Wishlist
            </h2>

            <p className="text-4xl mt-3 font-bold text-red-600">
              {wishlist.length}
            </p>
          </div>

        </div>

        {/* User */}

        <div className="bg-white shadow rounded-xl mt-10 p-6">
          <h2 className="text-2xl font-bold mb-4">
            User Information
          </h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {user?.name}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
            </>
          )}
          <button onClick={logoutHandler} className="mt-6 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
            Logout
          </button>
        </div>

      </div>

    </div>
  )
}

export default Dashboard
