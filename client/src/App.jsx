import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginScreen } from "./components/LoginScreen";
import { SignUpScreen } from "./components/SignUpScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/sign-up" element={<SignUpScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
