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
          <p className="mt-6 text-center text-xl text-gray-800 font-semibold">
            QUERAPIDA es una innovadora red social de cocina diseñada para
            entusiastas culinarios de todos los niveles
          </p>
        </div>
      </Container>
    </section>
  );
};
