import React, { useEffect, useState } from "react";
import RecipesGrid from "./RecipesGrid";
import { findUser, getLastRecipes } from "@/api/route";
import { set } from "react-hook-form";
import { current } from "@reduxjs/toolkit";

const LastRecipesScreen = () => {
  const [recipes, setRecipes] = useState([]);
  const [recipeErrors, setRecipesErrors] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [recipeTotal, setRecipeTotal] = useState(0);
  const[user, setUser] = useState(undefined);

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
      if(user && recipes.length > 0){
        const newNewcipes = recipes.map((recipe) => {
          recipe.isLiked = user.favorites.includes(recipe._id);
          return recipe;
        });
        console.log(newNewcipes);
        setRecipes(newNewcipes);
      }
    } catch (error) {}
  };

  const fetchUser = async () => {
    const userId = localStorage.getItem("queRapidaId");
    if (userId) {
        try {
          if (userId) {
            const response = await findUser(userId);
            setUser(response.user);
          }
        } catch (error) {
        }
    }
  };


  const checkLiked = () => {
    if(user && recipes.length > 0){
      const newNewcipes = recipes.map((recipe) => {
        recipe.isLiked = user.favorites.includes(recipe._id);
        return recipe;
      });
      console.log(newNewcipes);
      setRecipes(newNewcipes);
    }
  }

  useEffect(() => {
    getRecipes(currentPage);
  }, [currentPage]);

  useEffect(() => {
    checkLiked();
  },[user]);

  useEffect(() => {
    
      fetchUser();
    
  },[]);


  return (
    <div id="recipesLast" className="mt-4 p-6 shadow-md ring-0 ring-inherit ring-slate-300">
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
