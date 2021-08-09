import axios from "axios";
const apiClient = axios.create({
  baseURL: `https://pokeapi.co/api/v2/pokemon`,
  withCredentials: false, // This is the default
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  captureThemFirst() {
      console.log("first call")
    return apiClient.get("/?limit=150&offset=0");
  },
  captureThem(limit, offset) {
    return apiClient.get("/?limit=" + limit + "&offset=" + offset);
  },
  captureOne(id) {
    return apiClient.get(`/${id}`);
  },
};
