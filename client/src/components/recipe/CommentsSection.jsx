import React from "react";
import CommentsList from "./CommentsList";
import { useForm } from "react-hook-form";
import { InputError } from "../InputError";
import Axios from "axios";

const CommentsSection = ({ comments, recipeId, fetchRecipe }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmitComment = async (data) => {
    try {
      const response = await Axios.post(
        `/comment`,
        {
          content: data.comment,
          recipe: recipeId,
        },
        {
          withCredentials: true,
        },
      );

      fetchRecipe();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-14 rounded-md bg-white p-6 shadow-md">
      <h2 className="mb-4 flex items-center gap-2">
        <svg
          className="h-8 w-8 text-gray-700"
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
            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
          ></path>
        </svg>
        <span className="text-2xl font-semibold text-gray-700">
          Comentarios
        </span>
      </h2>
      <form action="" className="mb-8" onSubmit={handleSubmit(onSubmitComment)}>
        <div className="relative">
          <input
            {...register("comment", {
              required: true,
            })}
            id="comment"
            name="comment"
            type="text"
            className="peer block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 outline-orange-500 sm:text-sm"
            placeholder="Escribe un comentario"
          />

          <button
            type="submit"
            className="absolute right-0 top-1/2 text-gray-400 peer-focus:text-orange-500"
          >
            <svg
              className="absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2 text-inherit"
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
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              ></path>
            </svg>
          </button>
        </div>
        {errors.comment?.type === "required" && (
          <InputError message="El campo comentario es requerido" />
        )}
      </form>
      <CommentsList comments={comments} />
    </div>
  );
};

export default CommentsSection;
