import React, { useState } from "react";

import img1 from "../assets/1.jpg";

const Card = () => {
  const [isLiked, setIsLiked] = useState(false);

  const handleClickLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="max-w-xl overflow-hidden rounded-md bg-white shadow-md">
      <div className="relative">
        <img className="w-full select-none" src={img1} alt="recipe img" />
        <div
          className="absolute right-8 top-full flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 shadow-md"
          onClick={handleClickLike}
        >
          <svg
            className={
              isLiked ? "h-6 w-6 fill-red-500 text-red-500" : "h-6 w-6"
            }
            data-slot="icon"
            fill="none"
            stroke-width="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-xl font-semibold text-gray-950">
          Lorem ipsum
        </h3>
        <p className="mb-2 text-sm text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum nulla
          commodi labore.
        </p>
        <div className="flex items-center gap-2 text-gray-500">
          <svg
            className="h-6 w-6"
            data-slot="icon"
            fill="none"
            stroke-width="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            ></path>
          </svg>
          June Doe
        </div>
      </div>
    </div>
  );
};

export default Card;
