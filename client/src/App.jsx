import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";

import { LoginScreen } from "./components/LoginScreen";
import { SignUpScreen } from "./components/SignUpScreen";
import { HomeScreen } from "./components/HomeScreen";
import Navbar from "./components/Navbar";
import CreateRecipeScreen from "./components/CreateRecipeScreen";
import ProfileScreen from "./components/ProfileScreen";
import SearchRecipesScreen from "./components/SearchRecipesScreen";
import ExploreScreen from "./components/ExploreScreen";
import RecipeScreen from "./components/recipe/RecipeScreen";
import { UserProvider } from "./context/UserContext";

function App() {
  const { isLoggedIn, user } = useSelector((state) => state.user);
  const [cookies, setCookie, removeCookie] = useCookies();

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("queRapidaId", user.id);
      localStorage.setItem("queRapidaName", user.name);
      localStorage.setItem("queRapidaEmail", user.email);
      /* localStorage.setItem("queRapidaToken", user.token); */
      /* document.cookie = "userToken=" + user.token; */
      setCookie("userToken", user.token, {
        path: "/",
      });
    } else {
      localStorage.removeItem("queRapidaId");
      localStorage.removeItem("queRapidaName");
      localStorage.removeItem("queRapidaEmail");
      /* localStorage.removeItem("queRapidaToken"); */
      removeCookie("userToken", {
        path: "/",
      });
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <UserProvider>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/sign-up" element={<SignUpScreen />} />
            <Route path="/create-recipe" element={<CreateRecipeScreen />} />
            <Route path="/profile/:id" element={<ProfileScreen />} />
            <Route path="/search" element={<SearchRecipesScreen />} />
            <Route path="/recipe/:id" element={<RecipeScreen />} />
            <Route path="/*" element={<ExploreScreen />} />
          </Routes>
        </UserProvider>
      </main>
    </BrowserRouter>
  );
}

export default App;
