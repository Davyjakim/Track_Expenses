import axios from "axios";


 const token = localStorage.getItem("authToken");
 export default axios.create(
    {
        baseURL: 'https://track-expenses-api.onrender.com',
        headers: {
            "x-auth-token": token,
          },
    }
)