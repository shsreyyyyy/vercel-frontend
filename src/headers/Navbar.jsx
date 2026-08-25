import { useNavigate } from "react-router-dom";
import { IoCart } from "react-icons/io5";
import { AppContext } from "../context/cartContext";
import { useContext } from "react";

const Navbar = ({ isAuthenticated }) => {

  const navigate = useNavigate();
  const {count}=useContext(AppContext)
 

  return (
    <nav className={isAuthenticated===true ? "fixed z-10 top-0 w-365 h-16 bg-gray-900 border-b-4 border-red-500"
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
          <span className="absolute text-white top-1">{count}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;