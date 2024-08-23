import config from "../config/config.js";
import { Client, Account, ID } from "appwrite";

export class userService {
  client = new Client();
  account;
  users;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createUser({ email, password, fullname }) {
    if (!email || !password || !fullname) {
      console.log("all feild required");

      return { message: "all feild required" };
    }
    try {
      const newUser = await this.account.create(
        ID.unique(),
        email,
        password,
        fullname
      );
      if (newUser) {
        return this.login({ email, password });
      } else {
        return newUser;
      }
    } catch (error) {
      console.log("Problem while creating user account ", error.message);

      // return { message: "Problem while creating user account" };
      throw error;
    }
  }

  async login({ email, password }) {
    if (!email || !password) {
      return { message: "all feild required" };
    }
    try {
      return await this.account.createEmailPasswordSession(email, password);
      // console.log(userSession);
    } catch (error) {
      console.log("login error: ", error.message);
      throw error;
    }
  }

  async currentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error.message);
    }

    return null;
  }
  async getUser(userId) {
    try {
      return await this.account.get(userId);
    } catch (error) {
      console.log(error.message);
    }
    return null;
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("error while logout: ", error);
    }
  }

  
}

const authServices = new userService();

export default authServices;
