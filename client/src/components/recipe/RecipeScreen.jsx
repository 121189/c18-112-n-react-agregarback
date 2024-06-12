import React from "react";
import Container from "../Container";
import IngredientsSection from "./IngredientsSection";
import IntroSection from "./IntroSection";
import StepsSection from "./StepsSection";
import CommentsSection from "./CommentsSection";

const ingredients = [
  "2 huevos grandes",
  "300g de harina 0000",
  "100g de manteca",
  "250g de azucar",
  "1cdta de esencia de vainilla",
  "Jugo y rayadura de 1 limón",
];

const steps = [
  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima quia sed numquam ab eos vel similique dicta corrupti optio rerum. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima quia sed numquam ab eos vel similique dicta corrupti optio rerum. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima quia sed numquam ab eos vel similique dicta corrupti optio rerum.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. In dolores neque dignissimos minima esse, distinctio, aut dolore temporibus sit aliquam et aperiam nemo accusantium eligendi ab magni voluptates velit iusto.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptate totam animi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptate totam animi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptate totam animi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptate totam animi.",
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, repudiandae dolore voluptate natus nulla doloribus earum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptate totam animi.",
];

const comments = [
  {
    owner: {
      name: "John Doe",
    },
    date: "12/12/2024",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, repudiandae dolore voluptate natus nulla doloribus earum? Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate voluptate totam animi.",
  },
  {
    owner: {
      name: "June Doe",
    },
    date: "13/12/2024",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, repudiandae dolore voluptate natus nulla doloribus earum? Lorem ipsum dolor sit amet.",
  },
  {
    owner: {
      name: "June Doe",
    },
    date: "13/12/2024",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, repudiandae dolore voluptate natus nulla doloribus earum? Lorem ipsum dolor sit amet. Cupiditate voluptate totam animi. Cupiditate voluptate totam animi. Cupiditate voluptate totam animi.",
  },
];

const RecipeScreen = () => {
  return (
    <article className="min-h-screen bg-gray-100">
      <Container classes="space-y-6">
        <IntroSection />
        <IngredientsSection ingredients={ingredients} />
        <StepsSection steps={steps} />
        <CommentsSection comments={comments} />
      </Container>
    </article>
  );
};

export default RecipeScreen;
