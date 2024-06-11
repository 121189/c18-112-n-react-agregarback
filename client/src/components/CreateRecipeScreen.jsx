import React, { useState } from "react";
import Container from "./Container";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { InputError } from "./InputError";
import DynamicInputs from "./DynamicInputs";
import { useInputList } from "../hooks/useInputList";

const CreateRecipeScreen = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    items: ingredients,
    addItem: addIngredient,
    updateItem: updateIngredient,
    deleteItem: deleteIngredient,
    error: ingredientsError,
    checkErrors: checkIngredientsError,
  } = useInputList([], { minLength: 2 });

  const {
    items: steps,
    addItem: addStep,
    updateItem: updateStep,
    deleteItem: deleteStep,
    error: stepsError,
    checkErrors: checkStepsError,
  } = useInputList([], { minLength: 2 });

  const onSaveRecipe = (data) => {
    checkIngredientsError();
    checkStepsError();
    if (ingredientsError) return;
    if (stepsError) return;
    console.log({ ...data, ingredients, steps });
  };

  return (
    <section>
      <Container>
        <h1 className="mb-5 text-2xl">Crea tu receta</h1>
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit(onSaveRecipe)}
        >
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Título
              </label>
              <input
                {...register("title", {
                  required: true,
                })}
                id="title"
                type="text"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                placeholder="Introduce el título de la receta"
              />
              {errors.title?.type === "required" && (
                <InputError message="El campo título es requerido" />
              )}
            </div>
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Estado
              </label>
              <select
                name="status"
                id="status"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
              >
                <option value="published">Publicado</option>
                <option value="draft">Borrador</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="coverImage"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Imágen
            </label>
            <input
              {...register("coverImage", {
                required: true,
              })}
              id="coverImage"
              type="text"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
              placeholder="Introduce la URL de la imágen"
            />
            {errors.coverImage?.type === "required" && (
              <InputError message="El campo imágen es requerido" />
            )}
          </div>
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Descripción
            </label>
            <textarea
              {...register("description", {
                required: true,
              })}
              type="text"
              id="description"
              className="block h-auto w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
              placeholder="Introduce una descripción"
              rows={4}
            />
            {errors.description?.type === "required" && (
              <InputError message="El campo descripción es requerido" />
            )}
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="time"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Tiempo
              </label>
              <input
                {...register("time", {
                  required: true,
                  max: 60,
                  min: 1,
                })}
                id="time"
                type="number"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                placeholder="Introduce el tiempo de preparación en minutos"
              />
              {errors.time?.type === "required" && (
                <InputError message="El campo tiempo es requerido" />
              )}
              {errors.time?.type === "max" && (
                <InputError message="El valor debe ser menor o igual a 60" />
              )}
              {errors.time?.type === "min" && (
                <InputError message="El valor debe ser superior o igual a 1" />
              )}
            </div>
            <div>
              <label
                htmlFor="portions"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Porciones
              </label>
              <input
                {...register("portions", {
                  required: true,
                  min: 1,
                  max: 12,
                })}
                id="portions"
                type="number"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                placeholder="Introduce la cantidad de porciones que rinde la receta"
              />
              {errors.portions?.type === "required" && (
                <InputError message="El campo porciones es requerido" />
              )}
              {errors.portions?.type === "max" && (
                <InputError message="El valor debe ser menor o igual a 12" />
              )}
              {errors.portions?.type === "min" && (
                <InputError message="El valor debe ser superior o igual a 1" />
              )}
            </div>
          </div>
          <div>
            <DynamicInputs
              title="Ingredientes"
              data={ingredients}
              addItem={addIngredient}
              updateItem={updateIngredient}
              deleteItem={deleteIngredient}
              placeholder="Ingresa un ingrediente"
              displayName="ingrediente"
            />
            {ingredientsError === "minLength" && (
              <InputError message="Debe ingresar como mínimo 2 ingredientes" />
            )}
          </div>

          <div>
            <DynamicInputs
              title="Pasos"
              data={steps}
              addItem={addStep}
              updateItem={updateStep}
              deleteItem={deleteStep}
              placeholder="Ingresa un paso"
              displayName="paso"
            />
            {stepsError === "minLength" && (
              <InputError message="Debe ingresar como mínimo 2 pasos" />
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-orange-500 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-300 disabled:bg-orange-300 disabled:shadow-none"
          >
            {isLoading ? "Loading..." : "Guardar receta"}
          </button>
        </form>
      </Container>
    </section>
  );
};

export default CreateRecipeScreen;
