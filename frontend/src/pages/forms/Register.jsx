//TODO Libraries
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

//TODO Pages
import { registerUser } from "../../redux/apiCalls/authApiCall";

//TODO CSS Files
import "./form.css";

//TODO Main Function
const Register = () => {
  //TODO Variables
  const dispatch = useDispatch();
  const { registerMessage } = useSelector((state) => state.auth);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //TODO Functions
  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault(); //to do not reload the same page
    if (username.trim() === "") return toast.error("User Name is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");

    dispatch(registerUser({ username, email, password }));
  };

  const navigate = useNavigate();
  if (registerMessage) {
    Swal.fire({
      title: registerMessage,
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        //goto login page
        navigate("/login");
      }
    });
  }
  return (
    <section className="form-container">
      <h1 className="form-title">Create New Account</h1>
      <form onSubmit={formSubmitHandler} className="form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter your full name"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
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
          Register
        </button>
      </form>
      <div className="form-footer">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </section>
  );
};

export default Register;
