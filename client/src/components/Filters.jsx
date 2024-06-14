import React, { useState } from "react";
import Axios from "axios";

const Filters = ({ query, setRecipes, page = "" }) => {
  const [maxDuration, setMaxDuration] = useState("");
  const [ingredientsQty, setIngredientsQty] = useState("");
  const [portionsQty, setPortionsQty] = useState("");
  const [orderBy, setOrderBy] = useState("title");
  const [order, setOrder] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
      keywords: query,
      maxDuration,
      ingredientsQty,
      portionsQty,
      orderBy,
      order,
    });

    try {
      const response = await Axios.post(`/recipe/search/${page}`, {
        keywords: query,
        maxDuration,
        ingredientsQty,
        portionsQty,
        orderBy,
        order,
      });

      console.log(response.data);
      setRecipes(response.data.recipes);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-14 overflow-hidden rounded-md bg-white shadow-md">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-6 text-gray-700 md:space-y-6"
      >
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label
              htmlFor="maxDuration"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Duración máxima en minutos
            </label>
            <input
              value={maxDuration}
              id="maxDuration"
              name="maxDuration"
              type="number"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
              placeholder="Introduce la duración máxima en minutos"
              onChange={(e) => setMaxDuration(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="ingredientsQty"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Cantidad de ingredientes
            </label>
            <input
              id="ingredientsQty"
              name="ingredientsQty"
              value={ingredientsQty}
              type="number"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
              placeholder="Introduce la cantidad de ingredientes"
              onChange={(e) => setIngredientsQty(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label
              htmlFor="portionsQty"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Cantidad de raciones
            </label>
            <input
              id="portionsQty"
              type="number"
              name="portionsQty"
              value={portionsQty}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
              placeholder="Introduce la cantidad de raciones"
              onChange={(e) => setPortionsQty(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="sortBy"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Ordenar por
            </label>
            <select
              name="sortBy"
              id="status"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
              onChange={(e) => {
                const value = e.target.value;

                switch (value) {
                  case "titleAsc":
                    setOrderBy("title");
                    setOrder(1);
                    break;
                  case "titleDesc":
                    setOrderBy("title");
                    setOrder(-1);
                    break;
                  case "durationAsc":
                    setOrderBy("duration");
                    setOrder(1);
                    break;
                  case "durationDesc":
                    setOrderBy("duration");
                    setOrder(-1);
                    break;
                }
              }}
            >
              <option value="titleAsc">Título A - Z</option>
              <option value="titleDesc">Título Z - A</option>
              <option value="durationAsc">Duración Asc</option>
              <option value="durationDesc">Duración Desc</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          /* disabled={isLoading} */
          className="w-full rounded-lg bg-orange-500 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-300 disabled:bg-orange-300 disabled:shadow-none"
        >
          {/* {isLoading ? "Loading..." : "Guardar receta"} */}
          Aplicar filtros
        </button>
      </form>
    </div>
  );
};

export default Filters;
