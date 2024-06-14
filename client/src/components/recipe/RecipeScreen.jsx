import React, { useEffect, useState } from "react";
import Container from "../Container";
import IngredientsSection from "./IngredientsSection";
import IntroSection from "./IntroSection";
import StepsSection from "./StepsSection";
import CommentsSection from "./CommentsSection";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";

const RecipeScreen = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const {
    user: { id: userId },
  } = useSelector((state) => state.user);

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
              recipeId={recipe._id}
              title={recipe.title}
              description={recipe.description}
              coverImage={recipe.coverImage}
              duration={recipe.duration}
              owner={recipe.owner}
              liked={recipe.favorites.includes(userId)}
              fetchRecipe={fetchRecipe}
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
