import React from "react";

const CommentsList = ({ comments }) => {
  return (
    <ul className="flex flex-col gap-9">
      {comments.map((comment, index) => (
        <li key={index} className="space-y-2">
          <div className="flex items-center gap-2">
            <svg
              className="h-12 w-12 text-gray-500"
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
            <div>
              <h4 className="text-lg font-semibold">{comment.owner.name}</h4>
              <div className="text-sm text-gray-600">{comment.date}</div>
            </div>
          </div>
          <p className="text-lg text-gray-700">{comment.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default CommentsList;
