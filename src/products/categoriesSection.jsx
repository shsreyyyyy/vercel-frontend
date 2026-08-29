import React, { useContext,useEffect } from "react";
import { ProductContext } from "../context/productContext";
import { AppContext } from "../context/cartContext";
import { WishlistContext } from "../context/wishlistContext";

const CategoriesSection = () => {

  const { products,  categories, setCategories, fetchProduct, loading: productsLoading } = useContext(ProductContext);

  const { addToCart, addingProductId: cartAddingProductId } = useContext(AppContext);
  const {addToWishlist,getWishlist,addingProductId}=useContext(WishlistContext)

 useEffect(() => {
  fetchProduct("All Categories");
    getWishlist();
  }, []);
  const categoryList = [
    "All Categories",
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Books",
    "Beauty",
    "Sports",
    "Toys",
    "Mobiles",
  ];


  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">

      {/* Category Filter */}
      <div className="mb-6 sm:mb-8 rounded-xl bg-white p-4 sm:p-5 shadow-md border border-gray-200">

        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800">
            Product Categories
          </h2>

          <p className="text-sm text-gray-500">
            Select a category to view products
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          {categoryList.map((cat) => (
            <button
              key={cat}
              disabled={productsLoading}
              onClick={() => {
                setCategories(cat);
                fetchProduct(cat);
              }}
              className={`
                px-3 sm:px-5 py-2 rounded-md border text-sm font-medium
                transition-all duration-200
                hover:-translate-y-0.5 hover:shadow-md
                ${
                  categories === cat
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                    : "bg-gray-50 text-gray-600 border-gray-300 hover:bg-indigo-50 hover:text-indigo-600"
                }
              `}
            >
              {cat}
            </button>
          ))}

        </div>

      </div>


      {/* Products */}
      {productsLoading ? (
        <div className="flex min-h-60 items-center justify-center">
          <div className="flex items-center gap-3 text-gray-600">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />
            <span>Loading Products...</span>
          </div>
        </div>
      ) : (
      <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">

        {products.map((product) => (

          <div
            key={product._id}
            className="group overflow-hidden rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >

            {/* Image */}
            <div className="relative overflow-hidden bg-gray-100">

              <img
                src={product.image}
                alt={product.name}
                className="h-32 sm:h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />


              {/* Wishlist Button */}
              <button
                disabled={addingProductId === product._id}
                onClick={() => addToWishlist(product)}
                className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md text-xl transition-all duration-200 hover:scale-110 hover:bg-red-50"
              >
                ♡
              </button>


              {/* Category Badge */}
              <span className="absolute top-3 left-3 rounded-md bg-white/90 backdrop-blur px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm">
                {product.category}
              </span>

            </div>


            {/* Product Details */}
            <div className="p-3 sm:p-4">

              <h2 className="text-sm sm:text-lg font-bold text-gray-800 truncate">
                {product.name}
              </h2>

              <p className="mt-2 text-sm text-gray-500 line-clamp-2 min-h-10">
                {product.description}
              </p>


              {/* Price + Quantity */}
              <div className="mt-4 flex items-center justify-between">

                <span className="text-base sm:text-xl font-bold text-indigo-600">
                  ₹{product.price}
                </span>

                <span className="rounded-md bg-gray-100 px-2 sm:px-3 py-1 text-[10px] text-xs font-medium text-gray-600">
                  Qty: {product.quantity}
                </span>

              </div>


              {/* Add To Cart */}
              <button
                disabled={cartAddingProductId === product._id}
                onClick={() => addToCart(product)}
                className="mt-4 w-full rounded-md bg-indigo-600 py-2 sm:py-2.5 text:xs sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-95"
              >
                {cartAddingProductId === product._id ? "Adding..." : "Add To Cart"}
              </button>

            </div>

          </div>

        ))}

      </div>
      )}

    </div>
  );
};

export default CategoriesSection;