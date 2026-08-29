import { useContext } from 'react'
import { Link } from 'react-router-dom'
import {UserContext}  from '../context/userContext'

const Login = () => {

  const { btn, setEmail, setPassword, submitHandler } = useContext(UserContext)
   return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 px-4 sm:px-6">
      <div className="w-full max-w-sm rounded-lg bg-gray-800 p-5 sm:p-8 shadow-lg">
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
          <div>
            <label
              className="block text-sm font-medium text-gray-300">Password</label>
            <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white outline-none focus:border-indigo-500"
              placeholder="Enter your password" />
          </div>
          <div>
            <Link to={"/forgotPassword"} className='text-indigo-400 font-semibold cursor-pointer hover:text-indigo-300'>Forgot Password</Link>
          </div>
          <button type="submit"
            disabled={btn}
            className="w-full rounded-md bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60">
            {btn === true ? "Submitting..." : "Login"}</button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Have You Not Account?{" "}
          <Link to="/register" className="cursor-pointer font-semibold text-indigo-400 hover:text-indigo-300">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
