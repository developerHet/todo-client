import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  const user = useSelector((state) => state?.user?.currentUser);
  return (
    <>
      <Routes>
        <Route path="/" element={!user ? <Login /> : <Home />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={!user ? <Login /> : <Home />} />
      </Routes>
    </>
  );
}

export default App;
