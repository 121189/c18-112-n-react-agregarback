import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import Card from "./Card";
import { useParams } from "react-router-dom";
import { findUser, followUser, unfollowUser } from "../api/route";
import {Toaster} from "@/components/ui/sonner";
import { set } from "react-hook-form";

const ProfileScreen = () => {
  const {id} = useParams();
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const[user, setUser] = useState({});
  const[recipes, setRecipes] = useState([{}]);
  const [showFollow, setShowFollow] = useState(false);
  const handleUserById = async (id) => {
    try {
      const response = await findUser(id);
      setUser(response.user);
      setFollowers(response.followersQty);
      setFollowing(response.followingQty);
      setRecipes(response.recipes);
      setShowFollow(!response.isFollowing)
    } catch (error) {
      
    }
  }
  useEffect(() => {
    if(id){
      handleUserById(id);
    }
  }, [id]);

  const handleFollow = async (id) => {
    try {
      const response = await followUser(id);
      if(response.ok )
        {
          setShowFollow(true);   
          handleUserById(id);
        }  
    } catch (error) {
    }
  }

  const handleUnFollow = async (id) => {
    try {
      const response = await unfollowUser(id);
      if(response.ok  ){
        setShowFollow(false)
        handleUserById(id);
        }     
    } catch (error) {
    }
  }
const onclickFollow = (id) => {
  if(showFollow ){
    handleFollow(id);
  }else{
    handleUnFollow(id);
  }   
  console.log(showFollow);
}


  return (
    <div className="p-6">
      <div id="profile" className="ring-1 ring-inset ring-black p-4">
        <div className="flex w-full items-center">
        <div className="w-max justify-center pr-14">
          <div className="bg-[#F87316]  flex w-28 h-28 items-center justify-center rounded-full text-5xl font-semibold text-white">
            {user.name ? user?.name[0].toUpperCase() : ""}
          </div>
        </div>
        <div>
          <h1 className="font-semibold text-2xl">{user.name}</h1>
          <p>{user.bio}</p>
          <div className="font-semibold">
            <span className="mr-2">{followers} seguidores</span>
            <span>{following} seguidos</span>
          </div>
        </div>
        </div>      
          <button onClick={(e) => onclickFollow(user._id)} className="bg-black text-white w-full h-7 mt-2 text-xl ">
            {
              !showFollow? "Dejar de seguir" : "Seguir"
            }
            </button>        
      </div>
      <div id="recipes" className="ring-1 ring-inset ring-black p-4 mt-4">
        <h1 className="text-xl font-semibold">Recetas({recipes.length})</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {
            recipes.map((recipe, index) => {return <Card key={recipe._id} recipe={recipe} />  


          }                 
          )} 
        </div>
      </div>

    </div>
  );
};

export default ProfileScreen;