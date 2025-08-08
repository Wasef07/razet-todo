import React, { useEffect } from "react";
import Navbar from "../components/navbar/navbar";
import Home from "../components/home/Home";
import About from "../components/about/About";
import Todo from "../components/todo/Todo";
import SignUp from "../components/signup/Signup";
import SignIn from "../components/signin/Signin";
import Footer from "../components/footer/Footer";

import { useDispatch } from "react-redux";
import { authActions } from "./store";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
  const id = sessionStorage.getItem("id");
  if (id) {
    dispatch(authActions.login());
  }
}, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/todo/:id" element={<Todo />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
