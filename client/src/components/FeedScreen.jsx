import React, { useEffect, useState } from "react";
import Card from "./Card";
import RecipesGrid from "./RecipesGrid";
import { getFollowingRecipes } from "@/api/route";

const FeedScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeErrors, setRecipesErrors] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [recipeTotal, setRecipeTotal] = useState(0);

  const getRecipes = async () => {
    try {
      const response = await getFollowingRecipes(currentPage);
      setRecipes(response.recipes);
      setCurrentPage(response.page);
      setTotalPages(response.pages);
      setRecipeTotal(response.total);
      if (recipes.length === 0) {
        setRecipesErrors("No hay recetas");
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getRecipes(currentPage);
  }, [currentPage]);

  

  return recipes.length > 0? (
    <div id="recipesFeed" className="mt-4 p-6 shadow-md ring-0 ring-inherit ring-slate-300">
      <h1 className="mb-4 text-2xl font-semibold">Recetas ({recipeTotal})</h1>
      <RecipesGrid
        recipes={recipes}
        recipeErrors={recipeErrors}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={totalPages}
      />
    </div>
     
  ):(
    <div className="flex h-96 items-center justify-center max-lg:text-center">
      <h1 className="text-3xl font-bold text-[#4D4D4D] max-lg:text-2xl">
       Sigue a alguien para ver las recetas
      </h1>
    </div>
  );
};

export default FeedScreen;
