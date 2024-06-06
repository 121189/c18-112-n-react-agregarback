import React from "react";
import Card from "./Card";
import Container from "./Container";

const FeedScreen = () => {
  return (
    <section className="min-h-screen bg-gray-100 pt-6">
      <Container>
        <h2 className="mb-3 text-2xl font-semibold">Últimas recetas</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </Container>
    </section>
  );
};

export default FeedScreen;
