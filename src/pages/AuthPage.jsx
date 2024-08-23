import React from "react";
import {Button} from "../components/index.js"
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/ills.jpg"

function AuthPage() {
  return (
    <div className="h-screen bg-[#f5f5f5] flex justify-center gap-x-5">      
      <main className="flex flex-col items-center justify-center py-20 space-y-6">
        <h1 className="text-6xl font-bold text-center">
          Read Something New
        </h1>
        <p className="text-lg text-center text-gray-700">
          A place to read, write, and deepen your understanding
        </p>
        <Link
        to="/login"
        className="px-6 py-3 text-lg font-medium text-white bg-blue-700 rounded-full">
          Start reading
        </Link>
      </main>
      <div className="flex justify-center py-10">
        <img
          src={image}
          alt="Illustration"
          className="w-[500px] h-[500px] hover:shadow-lg hover:scale-105 duration-200 rounded-lg"
          width="300"
          height="300"
          style={{ aspectRatio: "300/300", objectFit: "cover" }}
        />
      </div>
    </div>
  );
}

export default AuthPage;
