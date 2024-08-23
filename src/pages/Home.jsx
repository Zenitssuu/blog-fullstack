import React, { useState, useEffect } from "react";
import services from "../appwrite/postsAuth.js";
import { useDispatch, useSelector } from "react-redux";
import { Container, PostCard, Select } from "../components/index.js";
import { AuthPage } from "./index.js";
import { setPosts } from "../features/postSlice.js";

function Home() {
  const [posts, setPost] = useState([]);
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.userReducer.status);
  const allPosts = useSelector((state) => state.postReducer.posts);
  const dispatch = useDispatch();
  const [category, setCategory] = useState("All");
  // console.log(allPosts);
  const allCategories = [
    "All",
    "education",
    "science",
    "technology",
    "sports",
    "health",
    "future",
    "energy",
    "social media",
  ];
  useEffect(() => {
    if (allPosts?.length !== 0) {
      console.log("redux");
      setPost(allPosts);
    } else {
      console.log("not redux");
      services.getAllPost([]).then((posts) => {
        if (posts) {
          dispatch(setPosts(posts.documents));
          setPost(posts.documents);
        }
      });
    }
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  console.log(category);

  if (!authStatus) {
    return <AuthPage />;
  }
  if (posts.length === 0) {
    return (
      <div className="w-full h-screen py-8 mt-4 text-center border">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                No Post Yet
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return !loader ? (
    <div className="w-full min-h-screen mb-10">
      <Container>
        <div className="flex justify-between w-full">
          <h1 className="mt-10 text-3xl font-bold">Latest Posts</h1>
          <Select options={allCategories} setCategory={setCategory} />
        </div>
        <div className="w-full grid grid-cols-1 self-center lg:grid-cols-2 md:grid-cols-1  sm:grid-cols-1 ">
          {category === "All"
            ? posts
                .slice(0)
                .reverse()
                .map((currPost) => (
                  <div key={currPost.$id} className="p-2 w-full">
                    <PostCard {...currPost} />
                  </div>
                ))
            : posts
                .slice(0)
                .reverse()
                .map((currPost) =>
                  currPost.category === category ? (
                    <div key={currPost.$id} className="p-2 w-full">
                      <PostCard {...currPost} />
                    </div>
                  ) : null
                )}
        </div>
      </Container>
    </div>
  ) : (
    <h1 className="text-4xl text-center h-screen">Loading...</h1>
  );
}

export default Home;
