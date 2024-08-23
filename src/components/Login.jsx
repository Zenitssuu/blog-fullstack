import React, { useState } from "react";
import { Input, Button } from "./index.js";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authServices from "../appwrite/userAuth.js";
import { useDispatch, useSelector } from "react-redux";
import {login as authLogin} from "../features/userSlice.js";
import {setPosts} from "../features/postSlice.js"
import services from "../appwrite/postsAuth.js";

function Login() {
  const { register, handleSubmit } = useForm();
  const [errors, setErrors] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (data) => {
    setErrors("");
    try {
      const userSession = await authServices.login(data);

      if (userSession) {
        const userData = await authServices.currentUser();
        const allPosts = await services.getAllPost();
        dispatch(setPosts(allPosts.documents));
        if (userData) {
          dispatch(authLogin(userData));
          const allPosts = await services.getAllPost();
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error.messgae);
      setErrors(error.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="border border-black/10 p-4 w-7/12 max-w-md bg-gray-100 rounded-xl">
        <div>
          <Link to="/">Logo</Link>
        </div>
        <div className="w-full text-center  mt-3">
          <h1 className="font-bold text-2xl">Login to your Account</h1>
          <p className="mt-2 text-center text-black/60 text-sm">
            Don&apos;t have any account?&nbsp;
            <Link
              to="/signup"
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
        <form className="mt-5 w-full" onSubmit={handleSubmit(login)}>
          <Input
            label="Email: "
            type="email"
            placeholder="enter your email"
            {...register("email", {
              required: true,
            })}
          />
          <Input
            label="Password: "
            type="password"
            placeholder="enter your passowrd"
            {...register("password", {
              required: true,
            })}
          />
          <div className="w-full flex justify-center mt-4">
            <Button type="submit">Sign In</Button>
          </div>
          {errors && 
            <p className="text-lg text-red-500 text-center">
              {errors}
            </p>
          }
        </form>
      </div>
    </div>
  );
}

export default Login;
