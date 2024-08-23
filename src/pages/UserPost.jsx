import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import services from "../appwrite/postsAuth.js";
import { Container, PostCard } from "../components/index.js";
import { useLoaderData } from "react-router-dom";

function UserPosts() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.userReducer.userData);

  // const allPosts = useSelector((state) => state.postReducer.posts);

  // console.log(userPosts);
  // allPosts?.filter(post => post.userId === userData.$id ? "here" : "not here");
  // userPosts.map(post => post.userId===userData.$id ? console.log(true) : console.log(false))
  // console.log(userPosts);
  

  useEffect(() => {
    // if(allPosts.length!==0){
    //   console.log("redux");
    //   allPosts.filter(post => post.userId !== userData.$id);
    //   console.log(allPosts);      
    //   setPosts(allPosts);
    // }
    // else{
      // console.log("not redux");
    services.getAllPostByUser(userData.$id).then((allposts) => {
      if (allposts) {
        setPosts(allposts.documents);
      }
    });
    // }
  }, []);
  console.log(posts);

  return posts ? posts.length !== 0 ? (
    <div className="min-h-screen">
      <Container>
        <div className="w-full grid lg:grid-cols-2 grid-rows-3 self-center md:grid-cols-1 sm:grid-cols-1">
          {posts.map((post) => (
            <div key={post.$id} className="p-2">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  ) : (
    <h1 className="text-2xl font-bold text-center min-h-screen mt-5">No Post Yet By User</h1>
  ) : <h1 className="text-2xl font-bold text-center min-h-screen mt-5">Loading...</h1>
}
export default UserPosts;

// export const userPostLoader = async () => {
//   const userPosts = await services.getAllPostByUser(userData.$id);
//   console.log(userPosts.documents);
//   return userPosts.documents;
// };
