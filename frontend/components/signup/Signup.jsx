import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: "", username: "", password: "" });

  const change = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (event) => {
    event.preventDefault();

    const { email, username, password } = inputs;

    if (!email || !username || !password) {
      toast.warning("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.envVITE_REACT_APP_RACKEND_BASEURL}/auth/register`, inputs);

      if (response.data.message === "User already exists") {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        setInputs({ email: "", username: "", password: "" });
        navigate("/signin");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="signup">
      <ToastContainer />
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column">
            <form className="sign-up-input-panel" onSubmit={submit}>
              <input
                className="sign-up-input"
                name="email"
                type="email"
                placeholder="Enter Your Email"
                onChange={change}
                value={inputs.email}
              />
              <input
                className="sign-up-input"
                name="username"
                type="text"
                placeholder="Enter Your Username"
                onChange={change}
                value={inputs.username}
              />
              <input
                className="sign-up-input"
                name="password"
                type="password"
                placeholder="Enter Your Password"
                onChange={change}
                value={inputs.password}
              />
              <button className="sign-up-btn" type="submit">
                Sign Up
              </button>
            </form>
          </div>
          <div className="col-lg-4 column">
            <h1 className="sign-up-heading">Join RaZet Now</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
