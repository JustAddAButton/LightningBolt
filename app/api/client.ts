import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://api.scryfall.com/",
});

export default apiClient;
