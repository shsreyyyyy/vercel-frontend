import { createContext , useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



 export const UserContext = createContext();


export const UserProvider = ({ children, setIsAuthenticated }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [btn, setBtn] = useState(false)
    const navigate = useNavigate()
      const [user, setUser] = useState(null);


    const submitHandler = async (e) => {
        e.preventDefault();
        setBtn(true);
        try {
            const { data } = await api.post("/youtube/user/login", {
                email, password
            })
            toast.success(data.message)
            if (data.requiresOtp) {
                navigate("/verify-otp")
            } else {
                setIsAuthenticated(true)
                navigate("/home")
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
        }
        finally {
            setBtn(false)
        }
    }

       const logoutHandler = async () => {
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
        }
    };

    const getProfile = async () => {
    try {

      setBtn(true);

      const { data } = await api.get(
        "/youtube/user/getProfile",
      );

      setUser(data.user);

    } catch (error) {

      toast.error(
        error?.response?.data?.message || error.message
      );

    } finally {

      setBtn(false);

    }
  };

    return (
        <UserContext.Provider value={{ submitHandler, btn, setBtn, email, setEmail, password, setPassword,logoutHandler,user,setBtn,btn,getProfile,setUser }}>
            {children}</UserContext.Provider>
    )
}