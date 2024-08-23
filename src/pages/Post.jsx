import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import services from "../appwrite/postsAuth.js";
import { Button, Container } from "../components/index.js";
import parse from "html-react-parser";

export default function Post() {
  const [currPost, setCurrPost] = useState(null);
  const [postOwnerId, setPostOwnerId] = useState("");
  const [postOwnerName, setPostOwnerName] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [relatedPost, setRelatedPost] = useState([]);

  const { slug } = useParams(); //postId
  const navigate = useNavigate();
  const dispacth = useDispatch();

  const userData = useSelector((state) => state.userReducer.userData);
  
  const isAuthor =
    currPost && userData ? currPost.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      services.getPost(slug).then((post) => {
        if (post) {
          setCurrPost(post);
        } else navigate("/");
      });
    } else navigate("/");

  }, [slug, navigate]);

  // console.log(currPost);
  const findUser = async () => {
    const user = await services.getUserPostIds(currPost?.userId);
    setPostOwnerId(user.documents[0].userId);
    setPostOwnerName(user.documents[0].username);
  };
  const findAllPosts = async () => {
    const allPosts = await services.getAllPostByUser(currPost?.userId);
    // console.log(allPosts);
    setUserPosts(allPosts?.documents);
    console.log(userPosts);
  };
  const findAllCategoryPost = async () => {
    const similarPosts = await services.getCategoryPost(currPost?.category);
    console.log(similarPosts);
    setRelatedPost(similarPosts?.documents);
  };
  useEffect(() => {
    findUser();
    findAllPosts();
    findAllCategoryPost();
  }, [currPost]);

  const deletePost = () => {
    services.deletePost(currPost.$id).then(async (status) => {
      if (status) {
        await services.deleteFile(currPost.featuredImage);
        await services.deleteUserPostId(currPost.userId);
        navigate("/");
      }
    });
  };
  console.log(userPosts?.length);
  return currPost ? (
    <div className="w-full flex justify-between px-2 min-h-screen ">
      <div className="w-[65dvw] flex gap-x-2  border-black/50 p-2 flex-col min-h-screen mb-5">
        <Container className="w-[70dvw]">
          <div className="flex justify-end gap-x-5 p-2">
            {isAuthor && (
              <div className="flex gap-x-5">
                <Link to={`/edit-post/${currPost.$id}`}>
                  <Button
                    className="outline-none font-semibold"
                    children="Edit"
                  />
                </Link>
                <Button
                  onClick={deletePost}
                  children="Delete"
                  className="bg-red-600 outline-none font-semibold"
                ></Button>
              </div>
            )}
          </div>
          <div>
            <div className="border border-black/10 rounded-lg flex justify-center p-2">
              <img
                className="object-scale-down h-full ... max-h-96 rounded-lg drop-shadow-xl hover:drop-shadow-2xl duration-200 border"
                src={services.getFilePreview(currPost?.featuredImage)}
                alt={currPost.title}
              />
            </div>
            <div className="p-2 border border-black/20 rounded-sm mt-8">
              <div className="border flex justify-between flex-col px-2 gap-y-4 mb-3">
                <Link to={`/profile/${postOwnerId}`}>
                  {/* todo: to={`profile/${userId}`} */}
                  <span className="font-bold">Author:</span> {postOwnerName}
                </Link>
                <h1 className="text-3xl font-bold mb-3 underline underline-offset-4">
                  {currPost.title}
                </h1>
              </div>
              <p className="text-lg">{parse(currPost.content)}</p>
              <span className="font-bold"></span>
            </div>
          </div>
          
        </Container>
      </div>
      <div className="w-[30dvw] mt-10">
        {userPosts?.length > 1 && (
          <div className="w-[30dvw] border border-black h-[60dvh] py-3 px-3 overflow-scroll overflow-x-hidden rounded-lg bg-slate-100">
            <h1 className="text-center border-b-4 text-xl font-semibold">
              Other posts by {postOwnerName}
            </h1>
            <div className="mt-4">
              <ul className="list-none flex flex-col gap-y-4">
                {userPosts?.map((post) =>
                  post.$id !== slug ? (
                    <Link key={post.$id} to={`/post/${post.$id}`}>
                      <li className="border-b-4               p-2">
                        <h1 className="font-semibold">{post.title}</h1>
                        <p className="px-3">
                        {parse(post.content.substr(0, 100))}    
                        </p>
                      </li>
                    </Link>
                  ) : null
                )}
              </ul>
            </div>
          </div>
        )}
        {userPosts?.length > 1 && (
          <div className="w-[30dvw] border border-black h-[60dvh] py-3 px-3 overflow-scroll overflow-x-hidden rounded-lg bg-slate-100 mt-5 mb-10">
            <h1 className="text-center border-b-4 text-xl font-semibold">
              Similar Posts
            </h1>
            <div className="mt-4">
              <ul className="list-none flex flex-col gap-y-4">
                {relatedPost?.map((post) =>
                  post.$id !== slug ? (
                    <Link key={post.$id} to={`/post/${post.$id}`}>
                      <li className="border-b-4               p-2">
                        <h1 className="font-semibold">{post.title}</h1>
                        <p className="px-3">{parse(post.content.substr(0, 100))}</p>
                      </li>
                    </Link>
                  ) : null
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  ) : (
    <h1 className="text-2xl font-bold h-screen mb-5 flex justify-center items-center">
      Loading...
    </h1>
  );
}
