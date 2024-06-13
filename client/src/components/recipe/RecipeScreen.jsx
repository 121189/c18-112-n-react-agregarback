import React, { useEffect, useState } from "react";
import Container from "../Container";
import IngredientsSection from "./IngredientsSection";
import IntroSection from "./IntroSection";
import StepsSection from "./StepsSection";
import CommentsSection from "./CommentsSection";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";

const ingredients = [
  "2 huevos grandes",
  "300g de harina 0000",
  "100g de manteca",
  "250g de azucar",
  "1cdta de esencia de vainilla",
  "Jugo y rayadura de 1 limón",
];

const steps = [
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima quia sed numquam ab eos vel similique dicta corrupti optio rerum. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima quia sed numquam ab eos vel similique dicta corrupti optio rerum. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima quia sed numquam ab eos vel similique dicta corrupti optio rerum.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. In dolores neque dignissimos minima esse, distinctio, aut dolore temporibus sit aliquam et aperiam nemo accusantium eligendi ab magni voluptates velit iusto.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptate totam animi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptate totam animi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptate totam animi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptate totam animi.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, repudiandae dolore voluptate natus nulla doloribus earum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptate totam animi.",
];

const comments = [
  {
    owner: {
      name: "John Doe",
    },
    date: "12/12/2024",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, repudiandae dolore voluptate natus nulla doloribus earum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptate totam animi.",
  },
  {
    owner: {
      name: "June Doe",
    },
    date: "13/12/2024",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, repudiandae dolore voluptate natus nulla doloribus earum? Lorem ipsum dolor sit amet.",
  },
  {
    owner: {
      name: "June Doe",
    },
    date: "13/12/2024",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, repudiandae dolore voluptate natus nulla doloribus earum? Lorem ipsum dolor sit amet. Cupiditate voluptate totam animi. Cupiditate voluptate totam animi. Cupiditate voluptate totam animi.",
  },
];

const RecipeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchRecipe();
  }, []);

  const fetchRecipe = async () => {
    setIsLoading(true);
    try {
      const response = await Axios.get(`/recipe/${id}`, {
        withCredentials: true,
      });

      setRecipe(response.data);

      const responseComments = await Axios.get(`/comment/${id}`, {
        withCredentials: true,
      });

      setComments(responseComments.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  const addComment = (newComment) => {
    setComments((prev) => [...prev, newComment]);
  };

  return (
    <article className="min-h-screen bg-gray-100">
      <Container classes="space-y-6">
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            <IntroSection
              title={recipe.title}
              description={recipe.description}
              coverImage={recipe.coverImage}
              duration={recipe.duration}
              owner={recipe.owner}
            />
            <IngredientsSection
              ingredients={recipe.ingredients}
              portions={recipe.portions}
            />
            <StepsSection steps={recipe.steps} />
            <CommentsSection
              comments={comments}
              recipeId={recipe._id}
              fetchRecipe={fetchRecipe}
            />
          </>
        )}
      </Container>
    </article>
  );
};

export default RecipeScreen;
