import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { logo } from '../../assets/images'
import Button from '../Button';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../store/actions';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading,setIsLoading] = useState(false)
    const {isAuthenticated} = useSelector((state)=>state.auth)
    useEffect(()=> {
        if(isAuthenticated)
            navigate("/admin")
    },[])


  const url = import.meta.env.VITE_APP_URL
const onSubmit = async (data) => {
    try {
        setIsLoading(true)
        const response = await fetch(`${url}/api/token/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: data.username,
                password: data.password,
            }),
        });

        if (response.ok) {
            const { access, refresh } = await response.json();
            dispatch(loginSuccess(data.username, access, refresh));

            toast.success("Login successful");
            setTimeout(() => navigate("/admin"), 1000);
        } else {
            toast.error("Invalid credentials");
        }
    } catch (error) {
        console.error("Login error:", error);
    } finally {
      setIsLoading(false)
    }
};

  return (
    <div>
        <ToastContainer/>
      <section className="bg-gray-100 ">
        <div className="flex flex-col items-center justify-center md:py-10 px-2 mx-auto">
          
          <div className="w-full bg-white rounded-lg shadow  sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 lg:p-4 space-y-4 md:space-y-6 sm:p-8">
                
            <img className="w-32 flex mx-auto" src={logo} alt="logo" />
                
          
              {/* <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1> */}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label htmlFor="username" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className={`bg-gray-50 border ${errors.username ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                    placeholder="Username"
                    {...register('username', { required: true })}
                  />
                  {errors.username && <span className="text-red-500 text-md">Username is required</span>}
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={`bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
                    placeholder="••••••••"
                    {...register('password', { required: true })}
                  />
                  {errors.password && <span className="text-red-500 text-md">Password is required</span>}
                </div>
                {/* <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                </div> */}
                <Button
                  type="submit"
                  className="w-full"
                >
                  {loading ? <ClipLoader size={20}/> : "Sign in"}
                </Button>
                {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                </p> */}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginForm;
