import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Button } from "./index.js";
import authServices from "../appwrite/userAuth.js";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../features/userSlice.js";
import services from "../appwrite/postsAuth.js";
import { setPosts } from "../features/postSlice.js";

function Signup() {
  // console.log("reached");
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const create = async (data) => {
    setMessage("");
    setError("");
    try {
      const user = await authServices.createUser(data);
      if (user) {
        const userData = await authServices.currentUser();
        const allPosts = await services.getAllPost();
        console.log(allPosts);
        if (userData) {
          dispatch(authLogin(userData));
          dispatch(setPosts(allPosts.documents));
          // console.log(userData);
          const userDoc = await services.createUserDocument({
            userId: userData.$id,
            username: userData.name,
          });
          // console.log(userDoc);
          if (userDoc) {
            navigate("/");
          } else {
            setError("Problem while adding user in user doc");
          }
        }
      }
    } catch (error) {
      // console.log(error.message);
      setError(error.message);
    }
  };

  // const createWithGoogle = async () => {
  //   console.log("here");

  //   setError("");
  //   try {
  //     const oAuthUserData = await authServices.createUserOauth();
  //     console.log(oAuthUserData);
  //     if (oAuthSession) {
  //       const userData = await authServices.currentUser();
  //       if (userData) {
  //         dispatch(authLogin(userData));
  //         console.log(userData);
  //         const userDoc = await services.createUserDocument({
  //           userId: userData.$id,
  //           username: userData.name,
  //         });
  //         console.log(userDoc);
  //         if (userDoc) {
  //           navigate("/");
  //         } else {
  //           setError("Problem while adding user in user doc");
  //         }
  //       }
  //     }
  //   }
  //   catch (error) {
  //     setError(error.message);
  //   }
  // };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="border border-black/10 bg-gray-100 rounded-xl p-4 w-7/12 max-w-md">
        <div>
          <Link to="/">Logo</Link>
        </div>
        <div className="w-full text-center mt-3">
          <h1 className="font-bold text-2xl">Create Account</h1>
          <p className="mt-2 text-center text-black/60 text-sm">
            Already have any account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline hover:text-blue-500"
            >
              Login
            </Link>
          </p>
        </div>
        <form className="mt-5 w-full" onSubmit={handleSubmit(create)}>
          <Input
            label="Full Name: "
            type="text"
            placeholder="enter your name"
            {...register("fullname", {
              required: true,
            })}
          />
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
          {error && <p className="text-lg text-center text-red-500">{error}</p>}
          <div className="w-full flex justify-center mt-4">
            <Button type="submit">Create Account</Button>
          </div>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Signup;
