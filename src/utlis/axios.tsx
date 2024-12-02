import axios from "axios";
const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDgzNGU2YmFiYzlmN2IxYzZlZDdkYyIsImlhdCI6MTczMjg1ODEzOSwiZXhwIjoxNzM1NDUwMTM5fQ.G1ad1hl9VxVsh05QR51RoCNj3dndMYfgoSIG_b1e-p8";

const api = axios.create({
    baseURL: "https://chat-mongo.onrender.com/api",
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  api.interceptors.response.use(
    (response) => response, 
    (error) => {
      console.log('error: ', error);
      console.log('error.response: ', error.response);
      if (error.response && error.response.status === 401) {
        window.location.reload();
      }
      console.error("API call failed:", error);
      return Promise.reject(error);
    }
  );

  export default api;