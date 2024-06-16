import { addFavorite, removeFavorite } from "@/api/route";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Card = ({
  _id,
  title,
  description,
  coverImage,
  owner,
  ownerId,
  setNewRecipe,
  isLikedRecipe,
  recipe,
}) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const handleClickLike = async () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);

    if (newLikedState) {
      await handleAddFavorite(_id);
    } else {
      await handleRemoveFavorite(_id);
    }
  };

  const handleAddFavorite = async () => {
    try {
      const response = await addFavorite(_id);
      if (response.ok) {
        setNewRecipe(response.recipe);
        console.log(response.recipe);
      }
    } catch (error) {}
  };

  const handleRemoveFavorite = async () => {
    try {
      const response = await removeFavorite(_id);
      if (response.ok) {
        setNewRecipe(response.recipe);
        console.log(response.recipe + " eliminado");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsLiked(isLikedRecipe);
  }, [isLikedRecipe]);

  return (
    <div className="max-w-xl overflow-hidden rounded-md bg-white shadow-md">
      <div className="relative">
        <div className="h-48 w-full" onClick={() => navigate("/recipe/" + _id)}>
          <img
            className="h-full w-full select-none object-cover object-center"
            src={coverImage}
            alt={title}
          />
        </div>

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
      <div className="p-4">
        <Link to={"/recipe/" + _id}>
          <h3 className="mb-2 text-xl font-semibold text-gray-950">{title}</h3>
        </Link>
        <p className="mb-2 text-sm text-gray-700">{description}</p>
        <Link
          className="flex items-center gap-2 text-gray-500"
          to={`/profile/${ownerId}`}
        >
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
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            ></path>
          </svg>
          {owner.name ? owner.name : owner}
        </Link>
      </div>
    </div>
  );
};

export default Card;
