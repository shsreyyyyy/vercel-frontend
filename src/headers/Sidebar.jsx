import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { ImHome } from "react-icons/im";
import { LuLogOut } from "react-icons/lu";
import { UserContext } from "../context/userContext";
import { IoCartSharp } from "react-icons/io5";
import { GrMultiple } from "react-icons/gr";
import { TbJewishStarFilled } from "react-icons/tb";
import { MdBorderColor } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { IoMenu } from "react-icons/io5";

const Sidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logoutHandler,logoutLoading } = useContext(UserContext)

  return (
    <>
      {/* Mobile Menu Button */}
      {!mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed left-3 top-3 z-[60] block rounded-md bg-gray-200 p-2 text-xl text-gray-700 md:hidden"
        >
          <IoMenu />
        </button>
      )}
      <div className={`group fixed top-0 z-[50] left-0 h-screen bg-[rgb(240,240,240)] md:w-20 md:hover:w-50 hover:delay-300 ease-in-out transition-all duration-300
      ${mobileOpen ? "w-40" : "w-0 overflow-hidden"}
     `}>
        {/* Mobile Close Button */}
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute right-3 top-3 text-2xl text-gray-600 md:hidden"
          >
            <IoMdClose />
          </button>
        )}
        {/* Menu */}
        <div className="flex flex-col gap-3 pt-5">
          <div className="rounded-r-md ml-1">
            {/* dashboard */}
            <button
              onClick={() => { navigate("/dashboard"); setActive("dashboard"); setMobileOpen(false) }}
              className={`mt-5 flex w-full py-2 text-sm hover:scale-105 transition-all duration-500 hover:text-black
              ${active === "dashboard" ? "text-blue-400" : "text-gray-500"}`}>
              <RxDashboard className=" shrink-0 ml-4 sm:ml-6 text-xl" />
              <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:delay-500 ml-2
              ${mobileOpen ? "max-w-32 opacity-100"
                  : "max-w-0 opacity-0 group-hover:max-w-32 group-hover:opacity-100"}`}>Dashboard</span>
            </button>
          </div>
          {/* home */}
          <div className="rounded-r-md ml-1">
            <button
              onClick={() => { navigate("/home"); setActive("home"); setMobileOpen(false) }}
              className={`flex w-full py-2 text-sm hover:scale-105 transition-all duration-500 hover:text-black
              ${active === "home" ? "text-blue-900" : "text-gray-500"}`}
            >
              <ImHome className="shrink-0  ml-4 sm:ml-6 text-xl" />
              <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:delay-500 ml-2
              ${mobileOpen ? "max-w-32 opacity-100"
                  : "max-w-0 opacity-0 group-hover:max-w-32 group-hover:opacity-100"}`}>Home</span>
            </button>
          </div>
          {/* cart */}
          <div className="rounded-r-md ml-1">
            <button
              onClick={() => { navigate("/cart/viewCart"); setActive("cart"); setMobileOpen(false) }}
              className={`flex w-full py-2 text-sm hover:scale-105 transition-all duration-500 hover:text-black
              ${active === "cart" ? "text-blue-900" : "text-gray-500"}`}
            >
              <IoCartSharp className="shrink-0  ml-4 sm:ml-6 text-xl" />
              <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:delay-500 ml-2
              ${mobileOpen ? "max-w-32 opacity-100"
                  : "max-w-0 opacity-0 group-hover:max-w-32 group-hover:opacity-100"}`}>Cart</span>
            </button>
          </div>
          {/* category */}
          <div className="rounded-r-md ml-1">
            <button
              onClick={() => { navigate("categories/categorySection"); setActive("category"); setMobileOpen(false) }}
              className={`flex w-full py-2 text-sm hover:scale-105 transition-all duration-500 hover:text-black
              ${active === "category" ? "text-blue-900" : "text-gray-500"}`}
            >
              <GrMultiple className="shrink-0  ml-4 sm:ml-6 text-xl" />
              <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:delay-500 ml-2
              ${mobileOpen ? "max-w-32 opacity-100"
                  : "max-w-0 opacity-0 group-hover:max-w-32 group-hover:opacity-100"}`}>Category</span>
            </button>
          </div>
          {/* wishlist */}
          <div className="rounded-r-md ml-1">
            <button
              onClick={() => { navigate("/product/wishlist"); setActive("wishlist"); setMobileOpen(false) }}
              className={`flex w-full py-2 text-sm hover:scale-105 transition-all duration-500 hover:text-black
              ${active === "wishlist" ? "text-blue-900" : "text-gray-500"}`}
            >
              <TbJewishStarFilled className="shrink-0  ml-4 sm:ml-6 text-xl" />
              <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:delay-500 ml-2
              ${mobileOpen ? "max-w-32 opacity-100"
                  : "max-w-0 opacity-0 group-hover:max-w-32 group-hover:opacity-100"}`}>Wishlist</span>
            </button>
          </div>
          {/* order */}
          <div className="rounded-r-md ml-1">
            <button
              onClick={() => { navigate("/user/order"); setActive("order"); setMobileOpen(false) }}
              className={`flex w-full py-2 text-sm hover:scale-105 transition-all duration-500 hover:text-black
              ${active === "order" ? "text-blue-900" : "text-gray-500"}`}
            >
              <MdBorderColor className="shrink-0  ml-4 sm:ml-6 text-xl" />
              <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:delay-500 ml-2
              ${mobileOpen ? "max-w-32 opacity-100"
                  : "max-w-0 opacity-0 group-hover:max-w-32 group-hover:opacity-100"}`}>Order</span>
            </button>
          </div>
          {/* logoutHandler */}
          <div className="rounded-r-md ml-1 mt-110 sm:mt-80">
            <button
              disabled={logoutLoading}
              onClick={logoutHandler}
              className={`flex w-full disabled:cursor-not-allowed disabled:opacity-50 py-2 text-sm hover:scale-105 transition-all duration-500 hover:text-black`}>
              <LuLogOut className=" shrink-0 ml-6 text-xl text-red-500" />
              <span className={`overflow-hidden whitespace-nowrap transition-all duration-300 group-hover:delay-500 ml-2 text-red-500
              ${mobileOpen
                  ? "max-w-32 opacity-100"
                  : "max-w-0 opacity-0 group-hover:max-w-32 group-hover:opacity-100"}`}>
                {logoutLoading ? "Logging out..." : "logout"}</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
};

export default Sidebar;