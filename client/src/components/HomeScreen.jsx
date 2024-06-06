import React from "react";
import Container from "./Container";
import { Link } from "react-router-dom";

export const HomeScreen = () => {
  return (
    <section className="min-h-screen bg-gray-100">
      <Container>
        <div className="mx-auto my-0 max-w-4xl pt-16">
          <h1 className="mb-4 text-center text-5xl font-semibold">QueRapida</h1>
          <p className="text-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga
            aliquid inventore pariatur et voluptates accusantium, saepe velit
            modi sequi sit reiciendis. Atque, expedita sunt? Incidunt omnis
            mollitia unde nobis nihil, dolore sapiente?
          </p>
          <p className="mb-6 text-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit qui
            reprehenderit molestiae, dolore amet, obcaecati aut quas doloremque
            iure adipisci esse ullam. Molestiae, unde?
          </p>
          <div className="flex justify-center">
            <Link
              to="/feed"
              className="mr-4 rounded-lg bg-orange-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-300"
            >
              Explorar
            </Link>
            <Link
              to="/create-recipe"
              className="rounded-lg bg-orange-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-300"
            >
              Publicar
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
