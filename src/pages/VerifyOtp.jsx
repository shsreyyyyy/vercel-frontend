import React,{useState} from 'react'
import {Link,useNavigate,} from "react-router-dom"
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'


const VerifyOtp = ({setIsAuthenticated}) => {

  const [otp, setOtp] = useState("")
  const [btn,setBtn]=useState(false)
  const navigate=useNavigate()
  const[timerLeft,setTimerLeft]=useState(0)
//get timer
  
    const getTimer=async()=>{
    try {
      const {data}=await axios.get("http://localhost:3000/youtube/user/otpTimer",{withCredentials:true})
      setTimerLeft(data.ttl)

    } catch (error) {
      toast.error(error.response?.error?.message || error.message)
    }
  }
  
  useEffect(() => {
   getTimer();
}, []);

//timer logic
  useEffect(()=>{
    if(timerLeft<=0) return;

    const timer=setTimeout(()=>{
      setTimerLeft((prev)=>prev-1)
    },1000)
    return ()=>clearTimeout(timer)
  },[timerLeft])

  const minutes=Math.floor(timerLeft / 60)
  const seconds=timerLeft % 60

  //check otp 
  const submitHandler = async (e) => {
    e.preventDefault();
    setBtn(true);
    try {
      const { data } = await axios.post("http://localhost:3000/youtube/user/verify_otp",
         { otp },
         {withCredentials:true})
      setIsAuthenticated(true)
       toast.success(data.message)
      navigate("/home")
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
    finally{
      setBtn(false)
    }
  }


  //resend otp
  const resendHandler = async (e) => {
    e.preventDefault();
    setBtn(true);
    try {
      const { data } = await axios.post("http://localhost:3000/youtube/user/resend",{},{withCredentials:true})
      toast.success(data.message)
      await getTimer()
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
    finally{
      setBtn(false)
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-6">
      <div className="w-full max-w-sm rounded-lg bg-gray-800 p-8 shadow-lg">
        <div className="text-center">
          <img
            className="mx-auto h-10 w-10"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
            alt="Logo"
          />
          <h2 className="mt-4 text-2xl font-bold text-white">
            Verify Your Account Using Otp
          </h2>
        </div>
        <form onSubmit={submitHandler} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">Enter Otp To Verify</label>
            <input type="number" name="otp" required onChange={(e) => setOtp(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white outline-none focus:border-indigo-500"
              placeholder="Enter your otp" />
          </div>
          <p className="mt-3 text-center text-sm text-gray-300">
  OTP expires in:{" "}
  <span className="font-semibold text-red-400">
    {minutes}:{seconds.toString().padStart(2, "0")}
  </span>
</p>
         
          <button type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700">
            {btn ===true ? "Submitting...":"Login"}</button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          If You  Not Received Otp?{" "}
          <button onClick={resendHandler} className="cursor-pointer font-semibold text-indigo-400 hover:text-indigo-300">
            resend
          </button>
        </p>
      </div>
    </div>
  )
}


export default VerifyOtp
