import {  createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export const AppContext = createContext();


export const AppProvider = ({ children, isAuthenticated, setIsAuthenticated }) => {
    const [count, setCount] = useState(0)
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate()

    const getCart = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:3000/user/cart/getCart",
                {
                    withCredentials: true,
                }
            );
            setCartItems(data.items);
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                error.message
            );
        } finally {
            setLoading(false);
        }
    };

    const getCount = async () => {
        try {
            const { data } = await axios.get("http://localhost:3000/user/cart/countCartData", { withCredentials: true })
            setCount(data.count)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
            setCount(0)
        }
    }

    const addToCart = async (pd) => {
        try {
            const { data } = await axios.post("http://localhost:3000/user/cart/add",
                {
                    productId: pd._id,
                    name: pd.name,
                    image: pd.image,
                    category: pd.category,
                    description: pd.description,
                    price: pd.price,
                },
                { withCredentials: true })
            toast.success(data.message)
            await getCart()
            await getCount()
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        }
    }

    const logoutHandler = async () => {
        try {
            const { data } = await axios.post(
                "http://localhost:3000/youtube/user/logout",
                {}, { withCredentials: true }
            );

            toast.success(data.message);

            setIsAuthenticated(false);
            navigate("/login");

        } catch (error) {
            if (error.response?.status === 401) {
                setIsAuthenticated(false);
                navigate("/login");
                return;
            }
            toast.error(
                error.response?.data?.message || error.message
            );
        }
    };


    useEffect(() => {
        if (isAuthenticated === true) {
            getCart()
            getCount()
        }
        else {
            setCartItems([])
            setCount(0)
            setLoading(false)
        }

    }, [isAuthenticated])

  
    return (
        <AppContext.Provider value={{ count, getCount, setCount, getCart, loading, cartItems, setCartItems, addToCart,logoutHandler,navigate }}>
            {children}
        </AppContext.Provider>
    )
}

