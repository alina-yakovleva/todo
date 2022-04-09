import { axios } from "./config";

export const getFolders = () =>
  axios.get("/folders?_expand=color").then(({ data }) => data);

export const addFolder = (name, colorId) =>
  axios
    .post("/folders", {
      name,
      colorId,
    })
    .then(({ data }) => data);

export const deleteFolder = (id) =>
  axios.delete(`/folders/${id}`).then(({ data }) => data);

export const editFolder = (id, name) =>
  axios
    .patch(`/folders/${id}`, {
      name,
    })
    .then(({ data }) => data)
    .catch(() => alert("Не удалось изменить название папки"));

export const getFolder = (id) =>
  axios
    .get(`/folders/${id}?_expand=color`)
    .then(({ data }) => data)
    .catch(() => alert("Не получить название папки"));
