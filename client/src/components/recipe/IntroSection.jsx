import React from "react";
import { Link } from "react-router-dom";

const IntroSection = ({ title, description, coverImage, duration, owner }) => {
  return (
    <div className="min-h-14 overflow-hidden rounded-md bg-white shadow-md">
      <div className="relative h-96">
        <img
          className="h-full w-full select-none object-cover"
          src={coverImage}
          alt={title}
        />
        <div className="absolute left-0 top-0 flex items-center gap-2 bg-orange-500 p-4 text-white shadow-md">
          <svg
            className="h-8 w-8"
            data-slot="icon"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            ></path>
          </svg>
          <span className="text-lg font-semibold">{duration} minutos</span>
        </div>
        <div className="absolute right-8 top-full flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white text-gray-500 shadow-md">
          <svg
            className="h-6 w-6"
            data-slot="icon"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            ></path>
          </svg>
        </div>
      </div>
      <div className="p-6">
        <h1 className="mb-4 text-4xl font-semibold text-gray-700">{title}</h1>
        <div className="mb-2 flex items-center gap-2 text-gray-500">
          <svg
            className="h-8 w-8"
            data-slot="icon"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            ></path>
          </svg>
          <Link to={`/profile/${owner._id}`}>
            <span className="text-base font-semibold">{owner.name}</span>
          </Link>
        </div>
        <p className="text-lg text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default IntroSection;
