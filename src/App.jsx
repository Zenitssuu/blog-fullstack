import { useState, useEffect } from "react";
import { Header, Footer } from "./components/index.js";
import authServices from "./appwrite/userAuth.js";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

import { login, logout } from "./features/userSlice.js";
function App() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authServices
      .currentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoader(false));
  }, []);

  return !loader ? (
    <div className="min-h-screen flex flex-wrap content-between">
      <div className=" w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
