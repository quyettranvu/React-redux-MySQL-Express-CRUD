import axios from "axios";

const httpClient = axios.create({
  baseUrl: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;
