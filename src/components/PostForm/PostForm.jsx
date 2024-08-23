import React from "react";
import { useForm } from "react-hook-form";
import services from "../../appwrite/postsAuth.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updatePost } from "../../features/postSlice.js";
import {RTE , Input, Button, Select} from "../index.js"

function PostForm({ post }) {
  const { register, handleSubmit, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });
  const dispacth = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userReducer.userData);
  // console.log(userData.$id);
  const submit = async (data) => {
    if (post) {
      console.log(post);
      const file = data.image[0]
        ? await services.uploadFile(data.image[0])
        : null;
      // console.log(file);
      if (file) {
        await services.deleteFile(post.featuredImage);
      }
      // console.log("old ",post.featuredImage);
      const oldPost = await services.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      console.log("new ",file?.$id);
      console.log("new ",oldPost.featuredImage);

      if (oldPost) {
        dispacth(updatePost(oldPost));
        navigate(`/post/${oldPost.$id}`);
      }
    } 
    else {
      const file = data.image[0]
        ? await services.uploadFile(data.image[0])
        : null;
        // console.log(file);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        // console.log(data);
        console.log(data.featuredImage);
        const newPost = await services.createPost({
          ...data,
          userId:userData.$id,
        });
        // console.log(newPost);
        if (newPost) {
          const allPostsByUser = await services.getUserPostIds(userData.$id);
          console.log(allPostsByUser);
          let tempIds = allPostsByUser?.documents[0]?.postId;
          if(tempIds){
            tempIds = [...tempIds,newPost.$id]
          }
          else{
            tempIds = [newPost.$id];
          }
          // console.log(allPostsByUser.documents[0].postId);
          await services.addUserPost(allPostsByUser.documents[0].$id ,{postId:tempIds})
          navigate(`/post/${newPost.$id}`);
        }
      }
    }
  };
  const types = ["education","science","technology","sports","health","future","energy","social media"]
  return (
    <form className="w-full flex p-2" onSubmit={handleSubmit(submit)}>
      <div className="w-2/3 flex flex-col items-center p-3 py-5 gap-y-5">
        <Input
          className="mt-10 w-1/2"
          label="Title: "
          type="text"
          placeholder="Type your post title"
          title={post?.title}
          {...register("title", { required: true })}
        />
        <RTE
          label="Content :"
          name="content"
          content = {post?.content}
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 p-3 py-5">
        <Input
          label="Featured Image: "
          type="file"
          file={post?.featuredImage}
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div>
            <img
              src={services.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          status={post?.status}
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Select
          options={types}
          label="Category"
          category={post?.category}
          className="mb-4"
          {...register("category", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
