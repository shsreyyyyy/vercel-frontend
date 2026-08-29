import { useState,useEffect, createContext } from "react";
import {api} from "../api/api";
import { toast } from "react-toastify";

export const WishlistContext=createContext();


export const WishlistProvider=({children})=>{
    const [wishlist, setWishlist] = useState([]);
      const [loading, setLoading] = useState(true);
      const [wishAddingProductId, setAddingProductId] = useState(null);
      const [removingProductId, setRemovingProductId] = useState(null);

      const addToWishlist = async (product) => {
        setAddingProductId(product._id);
        try {
            const { data } = await api.post(
                "/wishlist/add",
                { productId: product._id}
            );
            toast.success(data.message);
        } catch (error) {
            toast.error(
                error?.response?.data?.message || error.message
            );
        } finally {
            setAddingProductId(null);
        }
    };

      // GET WISHLIST
  const getWishlist = async () => {
    try {
      const { data } = await api.get(
        "/wishlist/get"
      );

      setWishlist(data.wishlist);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // REMOVE WISHLIST
  const removeWishlist = async (productId) => {
    setRemovingProductId(productId);
    try {
      const { data } = await api.delete(
        "/wishlist/remove",
        {
          data: {
            productId,
          }
        }
      );
      toast.success(data.message);
      // UI se bhi remove
      setWishlist((prev) =>
        prev.filter(
          (item) => item.productId._id !== productId
        )
      );

    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message
      );
    } 
    finally {
      setRemovingProductId(null);
  };
    } 
   



    return(
        <WishlistContext.Provider value={{addToWishlist,getWishlist,removeWishlist,loading,wishlist,wishAddingProductId,removingProductId}}>{children}</WishlistContext.Provider>
    )
}