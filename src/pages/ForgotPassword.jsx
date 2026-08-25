import React,{useState} from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const ForgotPassword = () => {

  const [email, setEmail] = useState("")
  const [btn,setBtn]=useState(false)
  const navigate=useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtn(true);
    try {
      const { data } = await axios.post("http://localhost:3000/youtube/user/forgotOtp", {
     email
      },{withCredentials:true})

      toast.success(data.message)
     navigate("/verifyForgotOtp")
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
            Login Your Account
          </h2>
        </div>
        <form onSubmit={submitHandler} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">Email</label>
            <input type="email" name="email" required onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white outline-none focus:border-indigo-500"
              placeholder="Enter your email" />
          </div>
          <button type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700">
            {btn ===true ? "Submitting...":"Login"}</button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          If Remember ?{" "}
          <Link to="/Login" className="cursor-pointer font-semibold text-indigo-400 hover:text-indigo-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPassword
