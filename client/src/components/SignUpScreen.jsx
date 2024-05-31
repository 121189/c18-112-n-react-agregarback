import React from "react";
import { Link } from "react-router-dom";

export const SignUpScreen = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8">
        <h1 className="mb-2 flex items-center text-3xl font-bold text-gray-900">
          Bienvenido a Cooking Zone
        </h1>
        <div className="w-full max-w-xl space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="font-semi-bold text-xl leading-tight tracking-tight text-gray-900 md:text-xl">
            Por favor ingresa tus datos para crear una cuenta
          </h1>
          <form className="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Nombre
              </label>
              <input
                type="name"
                name="name"
                id="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                placeholder="Introduce tu nombre completo"
                required=""
              />
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
                name="email"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                placeholder="Introduce tu correo electrónico"
                required=""
              />
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
                name="password"
                id="password"
                placeholder="Crea una contraseña segura"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                required=""
              />
            </div>
            <div>
              <label
                htmlFor="password2"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Confirmar contraseña
              </label>
              <input
                type="password"
                name="password2"
                id="password2"
                placeholder="Repite la contraseña"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                required=""
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gray-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300"
            >
              Crear cuenta
            </button>
            <p className="text-center text-sm font-light text-gray-500">
              Ya tienes una cuenta?{" "}
              <Link
                to="/"
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
