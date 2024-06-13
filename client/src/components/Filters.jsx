import React from "react";

const Filters = () => {
  return (
    <div className="min-h-14 overflow-hidden rounded-md bg-white shadow-md">
      <form action="" className="space-y-4 p-6 text-gray-700 md:space-y-6">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <label
              htmlFor="maxDuration"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Duración máxima en minutos
            </label>
            <input
              id="maxDuration"
              type="number"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
              placeholder="Introduce la duración máxima en minutos"
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
              type="number"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
              placeholder="Introduce la cantidad de ingredientes"
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
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
              placeholder="Introduce la cantidad de raciones"
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
            >
              <option value="published">Título A - Z</option>
              <option value="draft">Título Z - A</option>
              <option value="draft">Duración Asc</option>
              <option value="draft">Duración Desc</option>
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
