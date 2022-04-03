import { create } from "axios";

const axios = create({
  baseURL: "http://localhost:3001",
});

export const getFolders = () =>
  axios.get("/folders?_expand=color&_embed=tasks").then(({ data }) => data);

export const getColors = () => axios.get("/colors").then(({ data }) => data);

export const removeTask = (taskId) =>
  axios
    .delete(`/tasks/${taskId}`)
    .catch(() => alert("Не удалось удалить задачу"));

export const editTask = (taskId, text) =>
  axios
    .patch(`/tasks/${taskId}`, {
      text,
    })
    .catch(() => alert("Не удалось изменить задачу"));

export const completeTask = (taskId, completed) =>
  axios
    .patch(`/tasks/${taskId}`, {
      completed,
    })
    .catch(() => alert("Не удалось выполнить задачу"));

export const addFolder = (name, colorId) =>
  axios.post("/folders", {
    name,
    colorId,
  });

export const deleteFolder = (id) => axios.delete(`/folders/${id}`);

export const addTask = (task) => axios.post("/tasks", task);

export const editFolder = (id, name) =>
  axios.patch(`/folders/${id}`, {
    name,
  });
