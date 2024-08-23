import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import services from "../appwrite/postsAuth.js";
import parse from "html-react-parser";

function PostCard({ $id, title, featuredImage, content, userId }) {
  const [user, setUser] = useState(null);
  const getUserData = async()=>{
    const data = await services.getUserPostIds(userId);
    if(data) {
      setUser(data);
    }
  }
  // useEffect(() => {
    
  // }, []);
  // console.log(user);
  getUserData();
  let tempContent = content;
  if (content.length > 10) {
    tempContent = content.substring(0, 40);
    tempContent += "...";
  }
  // console.log(content);
  return user ? (
    <div className="border w-full flex justify-center items-center mt-10 p-2 hover:scale-105 duration-200">
      <Link to={`/post/${$id}`} className="flex justify-center border duration-200 hover:drop-shadow-md">
        <div className="w-full flex gap-x-4 items-center justify-center p-2">
          <div className=" w-1/3">
            <img
              className="object-cover h-36 w-52 ... rounded-lg"
              src={services.getFilePreview(featuredImage)}
              alt={title}
            />
          </div>
          <div className="p-2 w-2/3 text-md text-slate-600">
            <h1 className="font-bold text-2xl">{title}</h1>
            <p>{parse(tempContent)}</p>
            <p>created by: {user?.documents[0]?.username}</p>
          </div>
          <div></div>
        </div>
      </Link>
    </div>
  ) : null;
}

export default PostCard;
