import React, { useState, useEffect, useId } from "react";
import image from "../../assets/user.png"
import { useSelector } from "react-redux";
import services from "../../appwrite/postsAuth.js";
import { useParams } from "react-router-dom";
import {PostCard} from "../index.js"


function Profile() {
  const [currPosts, setCurrPosts] = useState([]);
  const [username, setUsername] = useState("");

  
  const { slug } = useParams();
  // console.log(slug);
  const userData = useSelector((state) => state.userReducer.userData);

  const userId = slug ? slug : userData.$id;
  const allPosts = useSelector((state) => state.postReducer.posts);
 
  // console.log(userId);
  useEffect(() => {
    services.getAllPostByUser(userId).then((allposts) => {
      if (allposts) {
        // console.log(allposts);
        setCurrPosts(allposts.documents);
      }
    });
    services
      .getUserPostIds(userId)
      .then((user) => {
        // console.log(user);        
        setUsername(user?.documents[0].username)
      });
  }, [slug]);

  return currPosts && username ? (
    <div className="min-h-screen">
      <div className=" mt-4 w-full h-60 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... rounded-b-lg flex justify-center ">
        <div className="h-40 w-36 drop-shadow-lg my-auto hover:scale-105 duration-200 cursor-pointer">
          <img
          className="w-full" 
          src={image} 
          alt={username}
           />
          <h1 className="text-center font-bold text-2xl text-white">{username}</h1>
        </div>
      </div>

      
      <h1 className="mt-4 text-center text-2xl font-bold underline underline-offset-4">
        POSTS
      </h1>
      {currPosts.length === 0 ? (
        <h2 className="text-center mt-10 text-3xl font-bold">
          NO POSTS BY USER YET
        </h2>
      ) : (
        <div>
          <div className="w-full grid lg:grid-cols-2 duration-200 self-center md:grid-cols-1 sm:grid-cols-1">
            {currPosts.map((currPost) => (
              <div key={currPost.$id} className="p-2 w-full">
                <PostCard {...currPost} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  ) : (
    <h1 className="text-2xl font-bold text-center h-screen">Loading...</h1>
  );
}

export default Profile;
