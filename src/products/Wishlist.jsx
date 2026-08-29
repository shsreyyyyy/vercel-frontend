import  { useEffect, useState, useContext } from "react";
import { TbJewishStarFilled } from "react-icons/tb";
import { AppContext } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import { WishlistContext } from "../context/wishlistContext";

const Wishlist = () => {
  

  const { addToCart, addingProductId: cartAddingProductId } = useContext(AppContext);
  const {loading,wishlist,getWishlist,removeWishlist,addingProductId,removingProductId}=useContext(WishlistContext)
  const navigate = useNavigate();


  useEffect(() => {
    getWishlist();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          Loading Wishlist...
        </h2>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          My Wishlist
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Your favorite products are saved here
        </p>
      </div>
      {/* Empty Wishlist */}
      {wishlist.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl bg-white shadow-sm border border-gray-200">
          <div className="mb-4 text-6xl text-gray-400">
            ♡
          </div>
          <h2 className="text-2xl font-bold text-gray-800">
            Your Wishlist is Empty
          </h2>
          <p className="mt-2 text-gray-500">
            Save your favorite products here.
          </p>
          <button
            onClick={() => navigate("/home")}
            className="mt-6 rounded-md bg-indigo-600 px-6 py-2.5 font-semibold text-white transition hover:bg-indigo-700"
          >
            Browse Products
          </button>
        </div>
      ) : (
        /* Products */
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {wishlist.map((item) => {
            const product = item.productId;
            return (
              <div
                key={item._id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-32 sm:h-52 w-full object-cover"
                  />
                  {/* Remove Wishlist */}
                  <button
                    disabled={removingProductId === product._id}
                    onClick={() =>
                      removeWishlist(product._id)
                    }
                    className="absolute right-3 top-3 rounded-full bg-white p-2 text-xl shadow hover:bg-red-50"
                  >
                    <TbJewishStarFilled className="text-red-500" />
                  </button>
                </div>
                {/* Details */}
                <div className="p-3 sm:p-4">
                  <h2 className="truncate text-sm sm:text-lg font-bold text-gray-800">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    {product.category}
                  </p>
                  <p className="mt-2 line-clamp-2 text-xs sm:text-sm text-gray-600">
                    {product.description}
                  </p>
                  {/* Price + Quantity */}
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-base sm:text-xl font-bold text-indigo-600">
                      ₹{product.price}
                    </span>
                    <span className="rounded-md bg-gray-100 px-2 sm:px-3 py-1 text-[10px] sm:text-xs text-gray-600">
                      Qty: {product.quantity}
                    </span>
                  </div>
                  {/* Add To Cart */}
                  <button
                    disabled={cartAddingProductId === product._id}
                    onClick={() => addToCart(product)}
                    className="mt-3 sm:mt-4 w-full rounded-md bg-indigo-600 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-indigo-700"
                  >
                    {cartAddingProductId === product._id ? "Adding..." : "Add To Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;