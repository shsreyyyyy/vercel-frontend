import { createContext,useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {AppContext} from "./cartContext"


export const OrderContext = createContext();



export const OrderProvider = ({ children }) => {
const { setCartItems, setCount } = useContext(AppContext);
const[orders, setOrders]=useState([])
const[loading, setLoading]=useState(false)

    const createOrder = async (paymentMethod) => {
        try {

            const { data } = await axios.post(
                "http://localhost:3000/order/create",
                {
                    paymentMethod: paymentMethod
                },
                {
                    withCredentials: true
                }
            );
            
            toast.success(data.message);
            setCartItems([]);
            setCount(0);
        } catch (error) {

            toast.error(
                error?.response?.data?.message || error.message
            );

            return null;
        }
    };

    const getOrders = async () => {
        try {

            setLoading(true);

            const { data } = await axios.get(
                "http://localhost:3000/order/get",
                {
                    withCredentials: true
                }
            );

            setOrders(data.orders);

        } catch (error) {

            toast.error(
                error?.response?.data?.message || error.message
            );

        } finally {

            setLoading(false);

        }
    };

    const cancelOrder = async (orderId) => {
  try {
    setLoading(true);

    const { data } = await axios.put(
      `http://localhost:3000/order/user/cancel/${orderId}`,
      {},
      {
        withCredentials: true,
      }
    );

    toast.success(data.message);

    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId
          ? { ...order, orderStatus: "cancelled" }
          : order
      )
    );

  } catch (error) {
    toast.error(
      error?.response?.data?.message || error.message
    );
  } finally {
    setLoading(false);
  }
};
    return (
        <OrderContext.Provider value={{ createOrder,getOrders,orders,loading,cancelOrder }}>{children}</OrderContext.Provider>
    )
}