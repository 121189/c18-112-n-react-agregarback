import React, { useState } from "react";
import Axios from "axios";

const orderFormValues = {
  titleAsc: {
    orderBy: "title",
    order: 1,
  },
  titleDesc: {
    orderBy: "title",
    order: -1,
  },
  durationAsc: {
    orderBy: "duration",
    order: 1,
  },
  durationDesc: {
    orderBy: "duration",
    order: -1,
  },
  noOrder: {
    orderBy: "",
    order: "",
  },
};

const Filters = ({ query, setRecipes, page = "" }) => {
  const [maxDuration, setMaxDuration] = useState("");
  const [ingredientsQty, setIngredientsQty] = useState("");
  const [portionsQty, setPortionsQty] = useState("");
  const [orderBy, setOrderBy] = useState("noOrder");

  const handleResetFilters = () => {
    setMaxDuration("");
    setIngredientsQty("");
    setPortionsQty("");
    setOrderBy("noOrder");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({
      keywords: query,
      maxDuration,
      ingredientsQty,
      portionsQty,
      orderBy: orderFormValues[orderBy].orderBy,
      order: orderFormValues[orderBy].order,
    });

    try {
      const response = await Axios.post(`/recipe/search/${page}`, {
        keywords: query,
        maxDuration,
        ingredientsQty,
        portionsQty,
        orderBy: orderFormValues[orderBy].orderBy,
        order: orderFormValues[orderBy].order,
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
              min={1}
              max={30}
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
              min={1}
              max={5}
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
              min={1}
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
              value={orderBy}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <option value="noOrder">Seleccione una opción</option>
              <option value="titleAsc">Título A - Z</option>
              <option value="titleDesc">Título Z - A</option>
              <option value="durationAsc">Duración Asc</option>
              <option value="durationDesc">Duración Desc</option>
            </select>
          </div>
        </div>
        <button
          type="button"
          className="w-full rounded-lg bg-red-500 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-red-400 focus:outline-none focus:ring-4 focus:ring-red-300 disabled:bg-red-300 disabled:shadow-none"
          onClick={handleResetFilters}
        >
          Reset
        </button>
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
