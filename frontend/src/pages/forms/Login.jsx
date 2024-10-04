//TODO Libraries
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

//TODO CSS Files
import "./form.css";

//TODO Redux Functions
import { loginUser } from "../../redux/apiCalls/authApiCall";

//TODO Main Function
const Login = () => {
  //TODO Variables

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  //TODO Functions
  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault(); //to do not reload the same page

    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");
    console.log({ email, password });
    
    dispatch(loginUser({ email, password }));
  };
  return (
    <section className="form-container">
      <h1 className="form-title">Login To Your Account</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-input"
            placeholder="Enter your email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter your password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="form-btn" type="submit">
          Login
        </button>
      </form>
      <div className="form-footer">
        have not an account? <Link to="/register">Register</Link>
      </div>
      <div className="form-footer">
        Did you forgot Your Password?{" "}
        <Link to="/forgot-password">Forgot Password</Link>
      </div>
    </section>
  );
};

export default Login;
