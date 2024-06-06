import React from "react";

const Container = ({ children, classes }) => {
  return (
    <div
      className={
        "mx-auto my-0 w-full max-w-7xl px-6 py-5" + " " + (classes || "")
      }
    >
      {children}
    </div>
  );
};

export default Container;
