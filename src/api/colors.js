import { axios } from "./config";

export const getColors = () => axios.get("/colors").then(({ data }) => data);
