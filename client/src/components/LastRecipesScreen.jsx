import React, { useEffect, useState } from "react";
import RecipesGrid from "./RecipesGrid";
import { getLastRecipes } from "@/api/route";
import { set } from "react-hook-form";
import { current } from "@reduxjs/toolkit";

const LastRecipesScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeErrors, setRecipesErrors] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [recipeTotal, setRecipeTotal] = useState(0);
  const getRecipes = async () => {
    try {
      const response = await getLastRecipes(currentPage);
      setRecipes(response.recipes);
      setCurrentPage(response.page);
      setTotalPages(response.pages);
      setRecipeTotal(response.total);
      if (recipes.length === 0) {
        setRecipesErrors("No hay recetas");
      }
      console.log(response);
    } catch (error) {}
  };

  useEffect(() => {
    getRecipes(currentPage);
  }, [currentPage]);
  return (
    <div id="recipesLast" className="mt-4 p-6 ring-1 ring-inset ring-gray-500">
      <h1 className="mb-4 text-2xl font-semibold">Recetas ({recipeTotal})</h1>
      <RecipesGrid
        recipes={recipes}
        recipeErrors={recipeErrors}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pages={totalPages}
      />
    </div>
  );
};

export default LastRecipesScreen;
