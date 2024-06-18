import { Fragment, useState } from "react";
import Card from "./Card";
import PaginationNav from "./PaginationNav";

const RecipesGrid = ({
  recipes,
  recipeErrors,
  owner=undefined,
  currentPage,
  setCurrentPage,
  pages,
}) => {
  const [newRecipe, setNewRecipe] = useState({});



  return recipes ? (
    <Fragment>
      <div className="flex flex-col">
        <div className="grid grid-cols-3 gap-4 max-lg:grid-cols-1">
          {recipes.map((recipe, index) => {
        
            return (
              <Card
                key={index}
                title={recipe.title}
                description={recipe.description}
                coverImage={recipe.coverImage}
                isLikedRecipe={recipe.isLiked}
                owner={!owner ? recipe.owner.name : owner.name}
                ownerId={!owner?._id ? recipe.owner._id : owner._id}
                _id={recipe._id}
                setNewRecipe={setNewRecipe}
              />
            );
          })}
        </div>
      </div>
      <div className="flex w-full justify-center">
        <PaginationNav
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pages={pages}
        />
      </div>
    </Fragment>
  ) : (
    <div className="flex h-96 items-center justify-center max-lg:text-center">
      <h1 className="text-3xl font-bold text-[#4D4D4D] max-lg:text-2xl">
        {recipeErrors}
      </h1>
    </div>
  );
};

export default RecipesGrid;
