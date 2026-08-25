import React, { useContext, useState } from 'react'
import { AppContext } from '../context/cartContext';
import { OrderContext } from '../context/orderContext';

const Payment = () => {

    const [paymentMethod, setPaymentMethod] = useState("upi")
    console.log(paymentMethod)
    const { cartItems } = useContext(AppContext)
    const { createOrder } = useContext(OrderContext);
    const subtotal = cartItems.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );
    const deliveryCharge = 50;
    const total = subtotal + deliveryCharge;

    return (
        <div className=' w-355 h-355 p-4 bg-gray-100 rounded-md '>
            <div className='flex-col h-350 p-2'>
                {/* order summery */}
                <div className='flex-col rounded-md shadow-lg w-300 h-60 ml-20 bg-white p-1'>
                    <h1 className='text-center font-bold text-3xl'>Order Summary</h1>
                   <h2 className="flex text-gray-800 font-semibold text-lg justify-between mx-5 mt-5">
  <span>Subtotal</span>
  <span>₹{subtotal}/-</span>
</h2>

<h2 className="flex text-gray-800 font-semibold text-lg justify-between mx-5 mt-5">
  <span>Delivery</span>
  <span>₹{deliveryCharge}/-</span>
</h2>

<hr className="mx-5 mt-5 text-gray-300" />

<h3 className="flex text-gray-800 font-semibold text-lg justify-between mx-5 mt-5">
  <span>Total</span>
  <span>₹{total}</span>
</h3>
                </div>

                {/* make payment */}
                <div className='mt-10 flex-col rounded-md shadow-lg w-300 h-120 ml-20 bg-white p-1'>
                    <h1 className='text-center font-bold text-3xl '>Select Payment Method</h1>
                    {/* upi */}
                    <div onClick={() => setPaymentMethod("upi")}
                        className={`border rounded-lg mx-5 mt-5 h-20 ${paymentMethod === "upi" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                        <div className='flex p-4'>
                            <input type='radio' checked={paymentMethod==="upi"} onChange={()=>setPaymentMethod("upi")}/>
                            <div className='ml-5'>
                                <h3 className='font-semibold'>UPI</h3>
                                <p className='text-gray-500 text-sm'>pay using Google Pay,PhonePe,Paytm etc.</p>
                            </div>
                        </div>
                    </div>
                    {/* card */}
                    <div onClick={() => setPaymentMethod("card")}
                        className={`border rounded-lg mx-5 mt-5 h-20 ${paymentMethod === "card" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                        <div className='flex p-4'>
                            <input type='radio' checked={paymentMethod==="card"} onChange={()=>setPaymentMethod("card")}/>
                            <div className='ml-5'>
                                <h3 className='font-semibold'>Credit/Debit Card</h3>
                                <p className='text-gray-500 text-sm'>Visa,Mastercard,RuPay</p>
                            </div>
                        </div>
                    </div>
                    {/* cash on delivery */}
                    <div onClick={() => setPaymentMethod("cash")}
                        className={`border rounded-lg mx-5 mt-5 h-20 ${paymentMethod === "cash" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}>
                        <div className='flex p-4'>
                            <input type='radio' checked={paymentMethod==="cash"} onChange={()=>setPaymentMethod("cash")}/>
                            <div className='ml-5'>
                                <h3 className='font-semibold'>Cash on Delivery</h3>
                                <p className='text-gray-500 text-sm'>Pay when your order is delivered</p>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <button onClick={()=>createOrder(paymentMethod)} className=' w-287 rounded-md py-2 border bg-blue-500 text-center mx-5 text-white text-xl bold mt-10'>Pay Now</button>
                        </div>
                </div>
            </div>

        </div>
    )
}

export default Payment
