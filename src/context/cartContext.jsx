import {  createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";


export const AppContext = createContext();


export const AppProvider = ({ children, isAuthenticated, setIsAuthenticated }) => {
    const [count, setCount] = useState(0)
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addingProductId, setAddingProductId] = useState(null);
    const [logoutLoading, setLogoutLoading] = useState(false);
    const navigate=useNavigate()

    const getCart = async () => {
        try {
            const { data } = await api.get(
                "/user/cart/getCart"
                
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
            const { data } = await api.get("/user/cart/countCartData")
            setCount(data.count)
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
            setCount(0)
        }
    }

    const addToCart = async (pd) => {
        setAddingProductId(pd._id);
        try {
            const { data } = await api.post("/user/cart/add",
                {
                    productId: pd._id,
                    name: pd.name,
                    image: pd.image,
                    category: pd.category,
                    description: pd.description,
                    price: pd.price,
                }
                )
            toast.success(data.message)
            await getCart()
            await getCount()
        } catch (error) {
            toast.error(error?.response?.data?.message || error.message)
        } finally {
            setAddingProductId(null);
        }
    }

    const logoutHandler = async () => {
        setLogoutLoading(true);
        try {
            const { data } = await api.post(
                "/youtube/user/logout",
                {}
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
        } finally {
            setLogoutLoading(false);
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
        <AppContext.Provider value={{ count, getCount, setCount, getCart, loading, cartItems, setCartItems, addToCart, addingProductId, logoutHandler, logoutLoading, navigate }}>
            {children}
        </AppContext.Provider>
    )
}

