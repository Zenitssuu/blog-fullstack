import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/Store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Home,
  Signup,
  UserPosts,
  AddPost,
  Post,
  EditPost,
  Login,
  Profile,
  About,

} from "./pages/index.js";
import { AuthLayout } from "./components/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/about",
        element: (
          <AuthLayout authentication>
            {" "}
            <About />
          </AuthLayout>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthLayout authentication>
            {" "}
            <Profile />
          </AuthLayout>
        ),
        children: [
          {
            path: ":slug",
            element: (
              <AuthLayout authentication>
                {" "}
                <Profile />
              </AuthLayout>
            ),
          },
        ],
      },
      {
        path: "/userposts",
        element: (
          <AuthLayout authentication>
            {" "}
            <UserPosts />
          </AuthLayout>
        ),
        // loader: { userPostLoader },
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
