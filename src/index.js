import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import CreateRecipe from "./components/CreateRecipe";
import RecipeDetails from "./components/RecipeDetails";
import About from "./components/About";
import Contact from "./components/Contact";
import Services from "./components/Services";
import { CookiesProvider } from "react-cookie";
import WelcomePage from "./components/WelcomePage";
import IndividualUser from "./components/IndividualUser";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CookiesProvider defaultSetOptions={{ path: "/" }}>
    <Router>
      <Routes>
        <Route path="contacts/:id" element={<Navbar />} />
        <Route path="/" element={[<WelcomePage />]} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/recipes/:title/:id" element={[<RecipeDetails />]} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />\
        <Route path="/services" element={<Services />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/home" element={<App />} />
        <Route path="/users/:name" element={<IndividualUser />} />
      </Routes>
    </Router>
  </CookiesProvider>
);
