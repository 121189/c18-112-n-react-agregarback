import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useDispatch } from "react-redux";

import { login } from "../redux/slices/userSlice";
import { InputError } from "./InputError";

export const LoginScreen = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await Axios.post("/session", {
        email: data.email,
        password: data.password,
      });
      dispatch(login(response.data));
      console.log(response.data);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <h1 className="mb-2 flex items-center text-3xl font-bold text-gray-900">
          Bienvenido de nuevo
        </h1>
        <div className="w-full max-w-xl space-y-4 p-6 sm:p-8 md:space-y-6">
          <h2 className="font-semi-bold text-xl leading-tight tracking-tight text-gray-900 md:text-xl">
            Por favor ingresa tus datos para acceder a tu cuenta
          </h2>
          <form
            className="space-y-4 md:space-y-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label
                htmlFor="email"
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
                })}
                placeholder="Introduce tu contraseña"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
              />
              {errors.password?.type === "required" && (
                <InputError message="El campo contraseña es requerido" />
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-gray-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 disabled:bg-gray-400 disabled:shadow-none"
            >
              {isLoading ? "Loading..." : "Iniciar"}
            </button>
            <p className="text-center text-sm font-light text-gray-500">
              Aún no tienes una cuenta?{" "}
              <Link
                to="/sign-up"
                className="font-medium text-gray-600 hover:underline"
              >
                Crear cuenta
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
