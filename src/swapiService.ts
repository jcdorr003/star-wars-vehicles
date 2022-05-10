import axios from "axios";
const swapi = axios.create({
  baseURL: "https://swapi.dev/api/",
  headers: {
    "Content-type": "application/json"
  }
});

export default swapi;