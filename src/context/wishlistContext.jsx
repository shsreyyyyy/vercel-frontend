import { useState,useEffect, createContext } from "react";
import axios from "axios"
import { toast } from "react-toastify";

export const WishlistContext=createContext();


export const WishlistProvider=({children})=>{
    const [wishlist, setWishlist] = useState([]);
      const [loading, setLoading] = useState(true);

      const addToWishlist = async (product) => {
        try {
            const { data } = await axios.post(
                "http://localhost:3000/wishlist/add",
                { productId: product._id},
                { withCredentials: true }
            );
            toast.success(data.message);
        } catch (error) {
            toast.error(
                error?.response?.data?.message || error.message
            );
        }
    };

      // GET WISHLIST
  const getWishlist = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/wishlist/get",
        {
          withCredentials: true,
        }
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
    try {
      const { data } = await axios.delete(
        "http://localhost:3000/wishlist/remove",
        {
          data: {
            productId,
          },
          withCredentials: true,
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
  };

 

    return(
        <WishlistContext.Provider value={{addToWishlist,getWishlist,removeWishlist,loading,wishlist}}>{children}</WishlistContext.Provider>
    )
}