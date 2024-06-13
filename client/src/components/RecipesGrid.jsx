import { Fragment } from "react";
import Card from "./Card";
import PaginationNav from "./PaginationNav";

const RecipesGrid = ({
  recipes,
  recipeErrors,
  owner,
  currentPage,
  setCurrentPage,
  pages,
}) => {
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
              owner={owner.name}
              id={recipe._id}
            />
          );
        })}
      </div>
    </div>
        <div className="w-full flex justify-center">
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
