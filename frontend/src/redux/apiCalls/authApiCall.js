//TODO Libraries
import { toast } from "react-toastify";

//TODO Global Variables
import { authActions } from "../slices/authSlice";
import request from "../../utils/request";

//TODO Functions

//in api call we must use external function that recall anonyms function
//Login User
export function loginUser(user) {
  return async (dispatch) => {
    //anonyms function
    try {
      // const response = await fetch("http://localhost:8000/api/auth/login", {
      //   method: "POST",
      //   body: JSON.stringify(user), //covert the object to json file
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // const data = await response.json();
      //same code in axios

      const { data } = await request.post("/api/auth/login", user);

      dispatch(authActions.login(data));
      //save the user content in local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
//Logout User
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
  };
}
//Register User
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);

      dispatch(authActions.register(data.message));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
//Verify Email
export function verifyEmail(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);

      dispatch(authActions.setIsEmailVerified());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
