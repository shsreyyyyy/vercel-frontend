import React, { useContext, useEffect } from "react";
import Categories from "../products/categories";
import { ProductContext } from "../context/productContext";
import { AppContext } from "../context/cartContext";
import { BsDot } from "react-icons/bs";

const Home = () => {
  const { products, fetchProduct } = useContext(ProductContext);
  const { addToCart } = useContext(AppContext);

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero */}
      <section className="bg-blue-600 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-5xl font-bold">
            Welcome to E-Shop
          </h1>

          <p className="mt-4 text-lg">
            Buy your favorite products at the best price.
          </p>

          <button onClick={() => {
  const section = document.getElementById("featured-products");
  window.scrollTo({ top: section.offsetTop,  behavior: "smooth",});}} 
  className="mt-6 rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-gray-200">
            Shop Now
          </button>
        </div>
      </section>

      {/* Categories */}
      <Categories />

      {/* Featured Products */}
      <section id="featured-products" className="mx-auto max-w-7xl px-6 py-12">
        <h2 className="mb-8 text-3xl font-bold">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products?.map((product) => (
            <div
              key={product._id}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Category Badge */}
                <span className="absolute left-3 top-3 rounded-md bg-white/90 px-3 py-1 text-xs font-semibold text-indigo-600 shadow">
                  {product.category}
                </span>
              </div>

              {/* Product Details */}
              <div className="flex flex-1 flex-col p-4">
                {/* Name */}
                <h2 className="h-7 truncate text-lg font-bold text-gray-800">
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
                  <span className="text-xl font-bold text-indigo-600">
                    ₹{product.price?.toLocaleString("en-IN")}
                  </span>

                  <span className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                    Qty: {product.quantity}
                  </span>
                </div>

                {/* Add To Cart */}
                <button
                  type="button"
                  onClick={() => addToCart(product)}
                  className="mt-auto w-full rounded-md bg-indigo-600 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-700 active:scale-95"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;