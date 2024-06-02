import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { LoginScreen } from "./components/LoginScreen";
import { SignUpScreen } from "./components/SignUpScreen";
import { HomeScreen } from "./components/HomeScreen";

function App() {
  const { isLoggedIn, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("queRapidaName", user.name);
      localStorage.setItem("queRapidaEmail", user.email);
      localStorage.setItem("queRapidaToken", user.token);
    } else {
      localStorage.removeItem("queRapidaName");
      localStorage.removeItem("queRapidaEmail");
      localStorage.removeItem("queRapidaToken");
    }
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/sign-up" element={<SignUpScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
