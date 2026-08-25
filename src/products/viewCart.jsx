import React, { useEffect, useState,useContext } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import { AppContext } from "../context/cartContext";
import {Link} from "react-router-dom"
const ViewCart = () => {

    const {cartItems,setCartItems,loading,getCount,navigate}=useContext(AppContext)

    const removeHandler=async(pd)=>{
        try {
            const {data}=await api.patch("/user/cart/removeCartItem",{
                productId:pd.productId
            })
            getCount()
            setCartItems(data.items)
            toast.success(data.message)
        } catch (error) {
            toast.error(error?.response?.data?.message || data.message)
        }
    }


    // Loading
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-xl font-semibold">
                    Loading Cart...
                </h2>
            </div>
        );
    }

    // Empty Cart
    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold">
                    Your Cart is Empty
                </h1>
                <p className="text-gray-500 mt-2">
                    Add some products to your cart.
                </p>
                <Link className="text-blue-500 text-xl animate-bounce" to={"/home"}>Browse Product</Link>
            </div>
        );
    }

    // Subtotal
    const subtotal = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );
    const delivery = 50;
    const total = subtotal + delivery;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-3xl font-bold mb-8">
                My Cart
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-5">
                    {cartItems.map((item) => (
                        <div key={item.productId}
                            className="bg-white rounded-xl shadow p-5 flex gap-5" >

                            {/* Product Image */}
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-32 h-32 object-cover rounded-lg" />
                            {/* Product Details */}
                            <div className="flex-1">
                                <h2 className="text-xl font-bold">
                                    {item.name}
                                </h2>
                                <p className="text-sm text-gray-500">
                                    {item.category}
                                </p>
                                <p className="text-gray-600 mt-2">
                                    {item.description}
                                </p>
                                <div className="flex gap-6 mt-3">
                                    <p className="text-lg font-bold">
                                        ₹{item.price}
                                    </p>
                                    <p className="text-gray-600">
                                        Quantity:{" "}
                                        <span className="font-bold">
                                            {item.quantity}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            {/* Remove */}
                            <div>
                                <button onClick={()=>removeHandler(item)} className="text-red-500 font-semibold hover:text-red-700 border border-red-300 px-5 py-1 rounded-full">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-xl shadow p-6 h-fit">
                    <h2 className="text-2xl font-bold mb-6">
                        Order Summary
                    </h2>
                    <div className="flex justify-between mb-3">
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between mb-3">
                        <span>Delivery</span>
                        <span>
                            ₹{delivery}
                        </span>
                    </div>
                    <hr className="my-4" />
                    <div className="flex justify-between text-xl font-bold">
                        <span>
                            Total
                        </span>
                        <span>
                            ₹{total}
                        </span>
                    </div>
                    <button onClick={()=>navigate("/user/cart/payment")}
                        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewCart;