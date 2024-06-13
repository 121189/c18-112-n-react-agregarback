import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { findUser, followUser, unfollowUser } from "../api/route";
import RecipesGrid from "./RecipesGrid";

const ProfileScreen = () => {
  const { id } = useParams();
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [user, setUser] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [showFollow, setShowFollow] = useState(false);
  const [recipeErrors, setRecipesErrors] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [recipeTotal, setRecipeTotal] = useState(0);
  const handleUserById = async (id) => {
    try {
      const response = await findUser(id, currentPage);
      setUser(response.user);
      setFollowers(response.followersQty);
      setFollowing(response.followingQty);
      setRecipes(response.recipes);
      setShowFollow(!response.isFollowing);
      setCurrentPage(response.page);
      setTotalPages(response.pages);
      setRecipeTotal(response.total);
      if(recipes.length === 0) {
        setRecipesErrors("No hay recetas")
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      if (id) {
        handleUserById(id, currentPage);
      }
    },[id,currentPage]);
    

  const handleFollow = async (id) => {
    try {
      const response = await followUser(id);
      if (response.ok) {
        setShowFollow(true);
        console.log(showFollow);
        handleUserById(id);
      }
    } catch (error) {}
  };

  const handleUnFollow = async (id) => {
    try {
      const response = await unfollowUser(id);
      if (response.ok) {
        setShowFollow(false);
        console.log(showFollow);
        handleUserById(id);
      }
    } catch (error) {}
  };
  const onclickFollow = (id) => {
    if (showFollow) {
      handleFollow(id);
    } else {
      handleUnFollow(id);
    }
  };

  return (
    <div className="p-6">
      <div id="profile" className="p-4 ring-1 ring-inset ring-black">
        <div className="flex w-full items-center">
          <div className="w-max justify-center pr-14">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#F87316] text-5xl font-semibold text-white">
              {user.name ? user?.name[0].toUpperCase() : ""}
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p>{user.bio}</p>
            <div className="font-semibold">
              <span className="mr-2">{followers} seguidores</span>
              <span>{following} seguidos</span>
            </div>
          </div>
        </div>
        <button
          onClick={(e) => onclickFollow(user._id)}
          className="mt-2 h-7 w-full bg-black text-xl text-white"
        >
          {!showFollow ? "Dejar de seguir" : "Seguir"}
        </button>
      </div>
      <div id="recipes" className="mt-4 p-6 ring-1 ring-inset ring-black">
        <h1 className="mb-4 text-2xl font-semibold">
          Recetas ({recipeTotal})
        </h1>
        <RecipesGrid
          recipes={recipes}
          recipeErrors={recipeErrors}
          owner={user}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={totalPages}
        />
      </div>
    </div>
  );
};

export default ProfileScreen;
