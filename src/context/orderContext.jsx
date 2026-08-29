import { createContext,useContext, useState } from "react";
import { toast } from "react-toastify";
import {api} from "../api/api";
import {AppContext} from "./cartContext"


export const OrderContext = createContext();



export const OrderProvider = ({ children }) => {
const { setCartItems, setCount } = useContext(AppContext);
const[orders, setOrders]=useState([])
const[loading, setLoading]=useState(false)
const[creatingOrder, setCreatingOrder]=useState(false)
const[cancellingOrderId, setCancellingOrderId]=useState(null)

    const createOrder = async (paymentMethod) => {
        setCreatingOrder(true);
        try {

            const { data } = await api.post(
                "/order/create",
                {
                    paymentMethod: paymentMethod
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
        } finally {
            setCreatingOrder(false);
        }
    };

    const getOrders = async () => {
        try {

            setLoading(true);

            const { data } = await api.get(
                "/order/get"
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
  setCancellingOrderId(orderId);
  try {
    setLoading(true);

    const { data } = await api.put(
      `/order/user/cancel/${orderId}`,
      {},
      
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
    setCancellingOrderId(null);
  }
};
    return (
        <OrderContext.Provider value={{ createOrder,getOrders,orders,loading,cancelOrder,creatingOrder,cancellingOrderId }}>{children}</OrderContext.Provider>
    )
}