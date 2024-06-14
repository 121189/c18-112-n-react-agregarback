import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { findUser, followUser, unfollowUser, updateUser } from "../api/route";
import RecipesGrid from "./RecipesGrid";
import { CameraIcon, CheckIcon, Pencil1Icon } from "@radix-ui/react-icons";

const ProfileScreen = () => {
  const { id } = useParams();
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [editing, setEditing] = useState(false);
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

      const myId = localStorage.getItem("queRapidaId");
      if (myId === id) {
        setIsMyProfile(true);
      } else {
        setIsMyProfile(false);
      }

      if (recipes.length === 0) {
        setRecipesErrors("No hay recetas");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      handleUserById(id, currentPage);
    }
  }, [id, currentPage]);

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

  const handleUpdateUser = async (form) => {
    try {
      console.log(form);
      const response = await updateUser(form, id);
      console.log(response);
      handleUserById(id);
      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen bg-slate-200 bg-opacity-15 p-6">
      <div
        id="profile"
        className="rounded-xl bg-white p-4 shadow-md ring-0 ring-inherit ring-slate-300"
      >
        <div className="relative flex w-full items-center">
          {
            isMyProfile && (
            <button
              onClick={() => {
                setEditing(!editing);
              }}
              className="absolute right-0 top-0 flex items-center gap-1 rounded bg-gray-200 px-2 text-sm font-semibold"
            >
              <Pencil1Icon /> Editar perfil
            </button>
            )
          }
          {editing  ? (
            <ProfileForm
              user={user}
              followers={followers}
              following={following}
              handleSubmit={handleUpdateUser}
            />
          ) : (
            <>
              <div className="w-max justify-center pr-14">
              <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[#F87316] text-5xl font-semibold text-white">
              {user.image ? (
                    <img
                      src={user.image}
                      alt="profile"
                      className="h-full w-full object-cover object-center"
                    />
                  ) : user.name ? (
                    user?.name[0].toUpperCase()
                  ) : (
                    ""
                  )}
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
            </>
          )}
        </div>
        {!isMyProfile ? (
          <button
            onClick={(e) => onclickFollow(user._id)}
            className="mt-2 h-7 w-full bg-black text-xl text-white"
          >
            {!showFollow ? "Dejar de seguir" : "Seguir"}
          </button>
        ) : (
          <p className="w-full text-center font-semibold">
            ¡Estás en tu perfil!
          </p>
        )}
      </div>
      <div
        id="recipes"
        className="mt-4 rounded-xl bg-white p-6 shadow-md ring-0 ring-inherit ring-slate-300"
      >
        <h1 className="mb-4 text-2xl font-semibold">Recetas ({recipeTotal})</h1>
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

const ProfileForm = ({ user, followers, following, handleSubmit }) => {
  const [form, setForm] = useState({
    name: user.name,
    bio: user.bio,
    image: user.image,
  });

  
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(form);
  };

  useEffect(() => {
    console.log(form);
  }, [form]);


  const isString = (image) => {
    return typeof image === "string"
  }

  return (
    <form className="flex" onSubmit={onSubmit}>
      <div className="w-max justify-center pr-14">
        <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-[#F87316] text-5xl font-semibold text-white">
          {user.image ? (
            <img
              src={isString(form.image) ? form.image : URL.createObjectURL(form.image)}
              alt="profile"
              className="h-full w-full object-cover"
            />
          ) : form.name ? (
            form.name.charAt(0).toUpperCase()
          ) : (
            ""
          )}
          <label
            htmlFor="image"
            className="absolute bottom-0 left-auto right-auto flex w-full cursor-pointer items-center justify-center bg-[rgba(0,0,0,0.4)] py-1 shadow"
          >
            <CameraIcon />
          </label>
        </div>
      </div>
      <input
        accept=".png, .jpg, .jpeg"
        type="file"
        name="image"
        id="image"
        onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        className="hidden"
      />
      <div className="py-4">
        <h1 className="text-2xl font-semibold">
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </h1>
        <p>
          <input
            type="text"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </p>
        <div className="font-semibold">
          <button
            type="submit"
            className="mt-2 flex items-center gap-1 rounded bg-[#F87316] px-1 py-1 text-sm text-white"
          >
            <CheckIcon /> Guardar
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileScreen;
