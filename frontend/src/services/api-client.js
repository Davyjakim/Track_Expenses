import axios from "axios";


const token = localStorage.getItem("authToken");
export default axios.create({
  baseURL: "https://trackexpensesapi-production.up.railway.app",
  headers: {
    "x-auth-token": token,
  },
});
