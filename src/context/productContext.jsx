import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import {api} from "../api/api";
import { createContext } from "react";

export const ProductContext = createContext();


export const ProductProvider = ({ children }) => {
    const [categories, setCategories] = useState("All Categories");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchProduct = async (category) => {
        setLoading(true);
        try {


            const { data } = await api.get(
                "/product/fetchProducts",
                {
                    params: {
                        category: category
                    },
                    
                }
            );
            setProducts(data.products);

        } catch (error) {
            toast.error(
                error?.response?.data?.message || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProductContext.Provider value={{ products, setProducts, fetchProduct,categories,setCategories,loading }}>{children}</ProductContext.Provider>
    )
}