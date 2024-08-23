import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, PostForm } from "../components/index.js";
import services from "../appwrite/postsAuth.js";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const reqPost = useSelector((state) => {
    const posts = state.postReducer;
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].$id === slug) {
        return setCurrPost(posts[i]);
      }
    }
    return;
  });

  useEffect(() => {
    if(reqPost){
        setPost(reqPost);
    }
    if (!reqPost) {
      if (slug) {
        services.getPost(slug).then((post) => {
          if (post) {
            setPost(post);
          }
        });
      } else {
        navigate("/");
      }
    }
  }, [reqPost,slug,navigate]);
  return post ? (
    <div>
        <Container>
            <PostForm post={post}/>
        </Container>
    </div>
  ) : null
}

export default EditPost;
