import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/cartContext";
import { ProductContext } from "../context/productContext";
import { BsDot } from "react-icons/bs";

const CategoryProducts = () => {

  const { category } = useParams();
  console.log(category)

  const { addToCart, addingProductId } = useContext(AppContext);

  const {
    products,
    fetchProduct,
    loading
  } = useContext(ProductContext);


  // Fetch products according to category
  useEffect(() => {

    if (category) {
      fetchProduct(category);
    }

  }, [category]);


  return (

    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">

      {/* Header */}
      <div className="mb-6 sm:mb-8">

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          {category} Products
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Products available in {category}
        </p>

      </div>


      {/* Products */}
      {loading ? (
        <div className="flex min-h-60 items-center justify-center">
          <div className="flex items-center gap-3 text-gray-600">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600" />
            <span>Loading Products...</span>
          </div>
        </div>
      ) : products.length === 0 ? (

        <div className="flex min-h-60 items-center justify-center">

          <div className="text-center">

            <h2 className="text-xl font-semibold text-gray-700">
              No Products Found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              No products are available in {category}.
            </p>

          </div>

        </div>

      ) : (
        // product
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4">

          {products.map((product) => (

            <div
              key={product._id}
              className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* Image */}
              <div className="relative overflow-hidden bg-gray-100">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-36 sm:h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Category Badge */}
                <span className="absolute left-3 top-3 rounded-md bg-white/90 px-3 py-1 text-xs font-semibold text-indigo-600 shadow">
                  {product.category}
                </span>

              </div>


              {/* Product Details */}
              <div className="p-3 sm:p-4">

                {/* Name */}
                <h2 className="truncate text-sm sm:text-lg font-bold text-gray-800">
                  {product.name}
                </h2>


                {/* Category */}
                <div className="mt-1 flex items-center text-sm text-gray-500">

                  <BsDot size={20} />

                  <span>
                    {product.category}
                  </span>

                </div>


                {/* Description */}
                <p className="mt-2 min-h-10 line-clamp-2 text-sm text-gray-600">
                  {product.description}
                </p>


                {/* Price + Quantity */}
                <div className="mt-4 flex items-center justify-between">

                  <span className="text-base sm:text-xl font-bold text-indigo-600">
                    ₹{product.price}
                  </span>

                  <span className="rounded-md bg-gray-100 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium text-gray-600">
                    Qty: {product.quantity}
                  </span>

                </div>


                {/* Add To Cart */}
                <button
                  disabled={addingProductId === product._id}
                  onClick={() => addToCart(product)}
                  className="mt-4 w-full rounded-md bg-indigo-600 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-95"
                >
                  {addingProductId === product._id ? "Adding..." : "Add To Cart"}
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
};

export default CategoryProducts;