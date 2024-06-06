import React from "react";

import Container from "./Container";
import { NavLink, Route, Routes } from "react-router-dom";
import LastRecipesScreen from "./LastRecipesScreen";
import FeedScreen from "./FeedScreen";

const ExploreScreen = () => {
  return (
    <section className="min-h-screen bg-gray-100 pt-6">
      <Container>
        <div className="mb-6 flex gap-6 text-lg">
          <NavLink
            className={({ isActive }) =>
              isActive ? "border-b-4 border-solid border-b-orange-500 pb-2" : ""
            }
            to="/ultimas-recetas"
          >
            Últimas recetas
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "border-b-4 border-solid border-b-orange-500 pb-2" : ""
            }
            to="/feed"
          >
            Feed
          </NavLink>
        </div>

        <Routes>
          <Route path="/ultimas-recetas" element={<LastRecipesScreen />} />
          <Route path="/feed" element={<FeedScreen />} />
        </Routes>
      </Container>
    </section>
  );
};

export default ExploreScreen;
