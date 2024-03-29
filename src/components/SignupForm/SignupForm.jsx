import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import userService from "../../services/userService";

const SignupForm = ({ handleSignupOrLogin }) => {
  const navigate = useNavigate();
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const handleChange = (e) => {
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.signup(signupInfo);
      handleSignupOrLogin();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(
      signupInfo.name &&
      signupInfo.email &&
      signupInfo.password &&
      signupInfo.password === signupInfo.passwordConf
    );
  };

  return (
    <div>
      <h3>Sign Up</h3>
      <form className="col s12" autoComplete="off" onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="text"
              autoComplete="off"
              className="active"
              id="name"
              value={signupInfo.name}
              name="name"
              onChange={handleChange}
            />
            <label htmlFor="name">Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="text"
              autoComplete="off"
              className="active"
              id="email"
              value={signupInfo.email}
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
              value={signupInfo.password}
              name="password"
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <input
              type="password"
              autoComplete="off"
              className="active"
              id="confirm"
              value={signupInfo.passwordConf}
              name="passwordConf"
              onChange={handleChange}
            />
            <label htmlFor="passwordConf">Confirm Password</label>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12 text-center">
            <button className="btn green" disabled={isFormInvalid()}>
              Sign Up
              <i className="material-icons right">arrow_forward</i>
            </button>
            &nbsp;&nbsp;
            <Link className="btn red" to="/">
              Cancel
              <i className="material-icons right">cancel</i>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
