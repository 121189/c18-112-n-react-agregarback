import React from "react";

const IngredientsList = ({ ingredients }) => {
  return (
    <ul className="list-none space-y-3">
      {ingredients.map((item, index) => (
        <li key={index} className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-orange-500"
            data-slot="icon"
            fill="none"
            strokeWidth="3"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 12.75 6 6 9-13.5"
            ></path>
          </svg>
          <span className="text-lg text-gray-700">{item}</span>
        </li>
      ))}
    </ul>
  );
};

export default IngredientsList;
