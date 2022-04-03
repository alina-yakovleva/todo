import { axios } from "./config";

export const getFolders = () =>
  axios.get("/folders?_expand=color&_embed=tasks").then(({ data }) => data);

export const addFolder = (name, colorId) =>
  axios.post("/folders", {
    name,
    colorId,
  });

export const deleteFolder = (id) => axios.delete(`/folders/${id}`);

export const editFolder = (id, name) =>
  axios
    .patch(`/folders/${id}`, {
      name,
    })
    .catch(() => alert("Произошла ошибка"));
