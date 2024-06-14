import React from "react";
import logo from "../assets/logo3.png";
import Container from "./Container";
import { Link } from "react-router-dom";

export const HomeScreen = () => {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center bg-gray-100 bg-cover">
      <Container>
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-center">
          <Link to={"/ultimas-recetas"}>
            <img src={logo} alt="logo de que rapida" />
          </Link>
          <h1 className="mb-4 hidden text-center text-5xl font-semibold">
            QueRapida
          </h1>
          <p className="mt-6 text-center text-lg text-gray-800">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fuga
            aliquid inventore pariatur et voluptates accusantium, saepe velit
            modi sequi sit reiciendis. Atque, expedita sunt? Incidunt omnis
            mollitia unde nobis nihil, dolore sapiente?
          </p>
          {/* <p className="mb-6 text-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit qui
            reprehenderit molestiae, dolore amet, obcaecati aut quas doloremque
            iure adipisci esse ullam. Molestiae, unde?
          </p> */}
          {/* <div className="flex justify-center">
            <Link
              to="/ultimas-recetas"
              className="mr-4 rounded-lg bg-orange-500 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-300"
            >
              Explorar recetas
            </Link>
          </div> */}
        </div>
      </Container>
    </section>
  );
};
