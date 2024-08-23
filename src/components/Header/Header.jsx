import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, LogoutBtn, Logo } from "../index.js";

function Header() {
  const authStatus = useSelector((state) => state.userReducer.status);
  const navigate = useNavigate();
  // console.log(authStatus);
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: authStatus,
    },
    {
      name: "Posts",
      slug: "/userposts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  const authentication = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "Profile",
      slug: "/profile",
      active: authStatus,
    },
  ];
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b shadow-lg bg-[#f3e0cf]">
      <Container>
        <nav className="flex items-center w-full">
          <div className="w-1/12 font-bold text-xl">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <ul className="flex w-9/12 justify-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button 
                  onClick={()=>navigate(item.slug)}
                  className=" text-gray-700 inline-block px-3 py-1 duration-200 hover:bg-slate-300 rounded-full text-lg">
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
          </ul>
          <ul className="flex w-2/12 justify-center">
            {authentication.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                  onClick={()=>navigate(item.slug)}
                  className="inline-block px-3 py-1 duration-200 hover:bg-slate-300 rounded-full text-lg"
                  >{item.name}</button>
                </li>
              ) : 
                null
            )}
          </ul>
            
          {authStatus && (
            <li className="list-none">
                <LogoutBtn/>
            </li>
            ) 
          }
        </nav>
      </Container>
    </header>
  );
}

export default Header;
