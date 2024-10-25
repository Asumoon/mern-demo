import React, { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Importing 
const Home = lazy(() => import("./modules/home"));
const Login = lazy(() => import("./modules/auth/components/login"));
const SignUp = lazy(() => import("./modules/auth/components/signUpForm"));

// Movie Related Routes
const Movie = lazy(() => import("./modules/movie/components/movie"));
const MovieItem = lazy(() => import("./modules/movie/components/movieItem"));
const MovieList = lazy(() => import("./modules/movie/components/movieList"));

const createRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/sign-up" element={<SignUp />} />
    <Route path="/create-user" element={<SignUp />} />

    {/* Nested routes */}
    <Route path="/movie" element={<Movie />}>
      <Route path="lists" element={<MovieList />} />
      <Route path="item" element={<MovieItem />} />
    </Route>
  </Routes>
);

export default createRoutes;
