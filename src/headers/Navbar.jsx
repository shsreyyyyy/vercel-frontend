import { useNavigate } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { AppContext } from "../context/cartContext";
import { useContext } from "react";

const Navbar = ({ isAuthenticated }) => {

  const navigate = useNavigate();
  const {count}=useContext(AppContext)
 

  return (
    <nav className={isAuthenticated===true ? "fixed z-10 top-0 right-0 w-365 h-16 bg-gray-900 border-b-4 border-red-500 md:w-[calc(100%-80px)]"
      :"fixed top-0 w-385 h-16 bg-gray-900 border-b-4 border-red-500"
    }>
      <div className="flex h-full items-center justify-between px-8">
        {/* Logo */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            EShop
          </h1>
        </div>
        {/* Right Side */}
        <div className="flex items-center gap-6">
          <button
            className="text-gray-300 hover:text-white transition"
            onClick={() => navigate("/home")}>
            Home
          </button>
          <button
            className="text-gray-300 hover:text-white transition"
            onClick={() => navigate("/dashboard")}>
            Dashboard
          </button>
          <button onClick={()=>navigate("/cart/viewCart")} className="">{<IoCart size={25} className="text-white mr-5"/>}
          <span className="absolute top-2 right-8 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white ">{count}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;