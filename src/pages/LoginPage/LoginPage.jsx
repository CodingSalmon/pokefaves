import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userService from "../../services/userService";

const LoginForm = ({ handleSignupOrLogin }) => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(loginInfo);
      handleSignupOrLogin();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div>
      <h3>Log In</h3>
      <form className="col s12" autoComplete="off" onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="text"
              autoComplete="off"
              id="email"
              className="active"
              value={loginInfo.email}
              name="email"
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="password"
              autoComplete="off"
              className="active"
              id="password"
              value={loginInfo.password}
              name="password"
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="col s12">
            <button className="btn green">
              Log In
              <i className="material-icons right">arrow_forward</i>
            </button>
            &nbsp;&nbsp;&nbsp;
            <Link className="btn red" to="/">
              Cancel
              <i className="material-icons right">cancel</i>
            </Link>
          </div>
        </div>
      </form>
      <Link to="/signup" className="row">
        New? Sign Up
      </Link>
    </div>
  );
};

export default LoginForm;
