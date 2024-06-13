import React, { useContext } from "react";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import Card from "./Card";
const ProfileScreen = () => {
  const {user} = useUser();
  const [userId, setUserId] = useState("66668f077263c9ca88c244af");
  return (
    <div className="p-6">
      <div id="profile" className="ring-1 ring-inset ring-black p-4">
        <div className="flex w-full items-center">
        <div className="w-max justify-center pr-14">
          <div className="bg-[#F87316]  flex w-28 h-28 items-center justify-center rounded-full text-5xl font-semibold text-white">
            {/* {user?.name[0].toUpperCase()} */}
            N
          </div>
        </div>
        <div>
          <h1 className="font-semibold text-2xl">Natalia Delgado</h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam
          accusantium vel nesciunt minus officiis sunt voluptatum harum earum,
          fugiat</p>
          <div className="font-semibold">
            <span className="mr-2">1000 seguidores</span>
            <span>1000 seguidos</span>
          </div>
        </div>
        </div>      
          <button className="bg-black text-white w-full h-7 mt-2 text-xl ">Seguir</button>        
      </div>
      <div id="recipes" className="ring-1 ring-inset ring-black p-4 mt-4">
        <h1>Recetas</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">                    
          <Card /> 
          <Card /> 
          <Card /> 
        </div>
      </div>

    </div>
  );
};

export default ProfileScreen;