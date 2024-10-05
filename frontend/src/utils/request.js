import axios from "axios";
const request = axios.create({
  baseURL: "https://blog-app-hazel-iota.vercel.app",
});
export default request;
