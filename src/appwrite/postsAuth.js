import config from "../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class postService {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({
    title,
    content,
    featuredImage,
    status = "active",
    userId,
    category,
  }) {
    // console.log("title: ", title);
    // console.log("content: ", content);
    // console.log("featureImage: ", featuredImage);
    // console.log("userId: ", userId);

    if (!title || !content || !featuredImage || !userId || !category) {
      return { message: "all feilds required" };
    }
    try {
      const post = await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwritePostCollectionId,
        ID.unique(),
        {
          title,
          content,
          featuredImage,
          status,
          userId,
          category
        }
      );
      return post;
    } catch (error) {
      console.log("error while creating post: ", error.message);
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwritePostCollectionId,
        slug
      );
      // console.log(document);
     
    } catch (error) {
      console.log("error while fetching post ", error.message);
      return false;
    }
  }

  async getAllPostByUser(userId) {
    if (!userId) {
      console.log("userID required");
      return;
    }
    try {
      return this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwritePostCollectionId,
        [Query.equal("userId", userId)]
      );
    } catch (error) {
      console.log("error while fetching users posts ", error.message);
      return;
    }
  }

  async getCategoryPost(category){
    if (!category) {
      console.log("category required");
      return;
    }
    try {
      return this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwritePostCollectionId,
        [Query.equal("category", category)]
      );
    } catch (error) {
      console.log("error while fetching similar posts ", error.message);
      return;
    }
  }
  

  async getAllPost() {
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwritePostCollectionId,
        [Query.equal("status", "active")]
      );
    } catch (error) {
      console.log("documents fectching error ", error.message);
    }
  }

  async updatePost(slug, { content, featuredImage, title, status }) {
    try {
      return await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwritePostCollectionId,
        slug,
        {
          content,
          title,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("error while updating document ", error.message);
    }
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwritePostCollectionId,
        slug
      );
      //todo delete image also
      return true;
    } catch (error) {
      console.log("error while deleting data ", error.message);
      return false;
    }
  }

  //file uploading service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        config.appwriteBuketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("error while uploading file ", error.message);
      return false;
    }
  }
  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(
        config.appwriteBuketId, 
        fileId
      );
      return true;
    } catch (error) {
      console.log("error while deleting file ", error.message);
      return false;
    }
  }
  getFilePreview(fileId) {
    return this.bucket.getFilePreview(config.appwriteBuketId, fileId);
  }

  async createUserDocument({ username, userId }) {
    try {
      await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteUserCollectionId,
        ID.unique(),
        { username:username, userId:userId }
      );
      return true;
    } catch (error) {
      console.log(
        "error while adding user in user collection: ",
        error.message
      );
      return false;
    }
  }
  async addUserPost(documentId, { postId }) {
    try {
      console.log(postId);
      await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteUserCollectionId,
        documentId,
        {
          postId,
        }
      );
      return true;
    } catch (error) {
      console.log("error while adding post in user document: ", error.message);
      return false;
    }
  }
  async getUserPostIds(userId) {
    return await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteUserCollectionId,
      [Query.equal("userId", userId)]
    );
  }
  async deleteUserPostId(userId,postId){
    const posts = await this.database.listDocuments(
      config.appwriteDatabaseId,
      config.appwriteUserCollectionId,
      [Query("userId",userId)]
    );
    const postArr = posts.documents[0].posts;
    console.log("old posts ",postArr);
    postArr.filter(post => post !== postId);
    console.log("new posts: ",postArr);
    await this.addUserPost(postArr);
  }
  
}

const services = new postService();

export default services;
