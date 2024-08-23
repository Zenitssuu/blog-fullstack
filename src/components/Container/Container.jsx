import React from "react";

function Container({ children }) {
  return (
    <div className={`w-full max-auto px-4`}>{children}</div>
  )
}

export default Container;
