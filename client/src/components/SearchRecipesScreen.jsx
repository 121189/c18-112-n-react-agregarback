import React, { useState } from "react";
import Card from "./Card";
import Container from "./Container";
import Filters from "./Filters";

const SearchRecipesScreen = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const handleToggleFilters = () => {
    setIsFilterVisible((prev) => !prev);
  };

  return (
    <section className="min-h-screen bg-gray-100 pt-6">
      <Container>
        <div className="mb-3 flex justify-between">
          <h2 className="text-2xl font-semibold">Resultados para "ensalada"</h2>
          <button
            onClick={handleToggleFilters}
            className="flex items-center rounded-lg bg-orange-500 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            <svg
              className="mr-2 h-6 w-6 text-white"
              data-slot="icon"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              ></path>
            </svg>
            <span>Filtros</span>
          </button>
        </div>
        {isFilterVisible && <Filters />}
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </Container>
    </section>
  );
};

export default SearchRecipesScreen;
