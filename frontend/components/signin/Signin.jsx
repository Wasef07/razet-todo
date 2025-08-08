import React, { useState } from "react";
import axios from "axios";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../src/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: "", password: "" });

  const change = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!inputs.email || !inputs.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_RACKEND_BASEURL}/auth/login`, inputs);

      if (response.data && response.data.message === "Login successful") {
        sessionStorage.setItem("id", response.data.id);
        dispatch(authActions.login());
        toast.success("Sign in successful!");
        navigate("/todo");
      } else {
        toast.error(response.data.message || "Invalid credentials.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Sign in failed.");
    }
  };

  return (
    <div className="signin">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column">
            <form className="sign-in-input-panel" onSubmit={submit}>
              <input
                className="sign-in-input"
                name="email"
                type="email"
                placeholder="Enter Your Email"
                onChange={change}
                value={inputs.email}
              />
              <input
                className="sign-in-input"
                name="password"
                type="password"
                placeholder="Enter Your Password"
                onChange={change}
                value={inputs.password}
              />
              <button className="sign-in-btn" type="submit">
                Sign In
              </button>
            </form>
          </div>
          <div className="col-lg-4 column">
            <h1 className="sign-in-heading">Good to See You Again!</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
