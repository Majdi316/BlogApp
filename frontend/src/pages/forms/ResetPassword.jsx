//TODO Libraries
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

//TODO CSS Files
import "./form.css";
import {
  getResetPassword,
  resetPassword,
} from "../../redux/apiCalls/passwordApiCall";

//TODO Main Function
const ResetPassword = () => {
  //TODO Variables

  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.password);
  const { userId, token } = useParams();
  const [password, setPassword] = useState("");

  //TODO Functions

  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [dispatch, userId, token]);
  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault(); //to do not reload the same page

    if (password.trim() === "") return toast.error("Password is required");
    dispatch(resetPassword(password, { userId, token }));
  };
  return (
    <section className="form-container">
      {isError ? (
        <h1>Not Found</h1>
      ) : (
        <>
          <h1 className="form-title">Reset Password</h1>
          <form onSubmit={formSubmitHandler} className="form">
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your New password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="form-btn" type="submit">
              Submit
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default ResetPassword;
