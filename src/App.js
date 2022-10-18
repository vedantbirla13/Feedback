import React from "react";
import "./App.css"
import {  BrowserRouter as Router  , Routes, Route } from "react-router-dom"
import Header from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Success from "./Components/Success/Success";


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route index element={<Home/>} />
        <Route path="/Success" element={<Success/>} />
      </Routes>
    </Router>
  );
}

export default App;
