import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { InputError } from "./InputError";

export const SignUpScreen = () => {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await Axios.post("/user", {
        name: data.name,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });
      setIsLoading(false);
      console.log("New user was created: ", response.data);
      //TODO
      //Show success message
      //Login?
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
      // TODO
      //Show error message
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8">
        <h1 className="mb-2 flex items-center text-3xl font-bold text-gray-900">
          Bienvenido a QUERAPIDA
        </h1>
        <div className="w-full max-w-xl space-y-4 p-6 sm:p-8 md:space-y-6">
          <h2 className="font-semi-bold text-xl leading-tight tracking-tight text-gray-900 md:text-xl">
            Por favor ingresa tus datos para crear una cuenta
          </h2>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Nombre
              </label>
              <input
                type="name"
                {...register("name", {
                  required: true,
                })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                placeholder="Introduce tu nombre completo"
              />
              {errors.name?.type === "required" && (
                <InputError message="El campo nombre es requerido" />
              )}
            </div>
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                })}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                placeholder="Introduce tu correo electrónico"
              />
              {errors.email?.type === "required" && (
                <InputError message="El campo email es requerido" />
              )}
              {errors.email?.type === "pattern" && (
                <InputError message="El formato del email es incorrecto" />
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Contraseña
              </label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{};:'",.<>/?[\]`|~]).{8,}$/,
                })}
                placeholder="Crea una contraseña segura"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
              />
              {errors.password?.type === "required" && (
                <InputError message="El campo contraseña es requerido" />
              )}
              {errors.password?.type === "pattern" && (
                <InputError message="La contraseña debe ser de al menos 8 caracteres, una letra mayuscula, una letra minúscula, un número y un carácter especial" />
              )}
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Confirmar contraseña
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  validate: {
                    matchesPreviousPassword: (value) =>
                      value === getValues().password,
                  },
                })}
                placeholder="Repite la contraseña"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
              />
              {errors.confirmPassword?.type === "matchesPreviousPassword" && (
                <InputError message="Las contraseñas deben coincidir" />
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-gray-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:bg-gray-400 disabled:shadow-none"
            >
              {isLoading ? "Loading..." : "Crear cuenta"}
            </button>
            <p className="text-center text-sm font-light text-gray-500">
              Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="font-medium text-gray-600 hover:underline"
              >
                Iniciar sesión
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
