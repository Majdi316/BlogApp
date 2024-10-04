//TODO Libraries
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

//TODO CSS Files
import "./form.css";
import { forgotPassword } from "../../redux/apiCalls/passwordApiCall";

//TODO Main Function
const ForgotPassword = () => {
  //TODO Variables
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  //TODO Functions
  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault(); //to do not reload the same page

    if (email.trim() === "") return toast.error("Email is required");

    dispatch(forgotPassword(email));
  };
  return (
    <section className="form-container">
      <h1 className="form-title">Forgot Password</h1>
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

        <button className="form-btn" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default ForgotPassword;
