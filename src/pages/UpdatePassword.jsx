import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api/api'

const UpdatePassword = () => {

  const [password, setPassword] = useState("")
  const [rePassword, setRePassword] = useState("")
  const [btn, setBtn] = useState(false)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    setBtn(true);
    try {
      const { data } = await api.post("/user/updatePassword", {
        password, rePassword
      })
      toast.success(data.message)
    navigate("/login")
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    }
    finally {
      setBtn(false)
    }
  }
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
            Update Your Password
          </h2>
        </div>
        <form onSubmit={submitHandler} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">Password</label>
            <input type="password" name="password" required onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white outline-none focus:border-indigo-500"
              placeholder="Enter your Password" />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-300">RePassword</label>
            <input type="rePassword" name="rePassword" required onChange={(e) => setRePassword(e.target.value)}
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white outline-none focus:border-indigo-500"
              placeholder="Enter your RePassword" />
          </div>
          <button type="submit" disabled={btn}
            className="w-full rounded-md bg-indigo-600 py-2 font-semibold text-white hover:bg-indigo-700">
            {btn === true ? "Submitting..." : "Login"}</button>
        </form>
      </div>
    </div>
  )
}

export default UpdatePassword
