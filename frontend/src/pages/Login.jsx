/* eslint-disable no-unused-vars */
import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { FaSignInAlt } from "react-icons/fa";
import { login } from "../features/auth/authSlice";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const dispatch = useDispatch();

  const { user, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
  }
  function onSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> LogIn
        </h1>
        <p>Please log in to support</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              value={email}
              name="email"
              id="email"
              onChange={onChange}
              placeholder="Enter your e-mail"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              value={password}
              name="password"
              id="password"
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
