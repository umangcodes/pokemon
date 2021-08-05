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
  catchThemFifty() {
    return apiClient.get("/?limit=50&offset=0");
  },
  catchThem(limit, offset) {
    return apiClient.get("/?limit=" + limit + "&offset=" + offset);
  },
  catchOne(id) {
    return apiClient.get(`/${id}`);
  },
};
