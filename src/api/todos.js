import { create } from "axios";

const axios = create({
  baseURL: "http://localhost:3001",
});

export const getTodos = () =>
  axios.get("/lists?_expand=color&_embed=tasks").then(({ data }) => data);

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

export const addLists = (name, colorId) =>
  axios.post("/lists", {
    name,
    colorId,
  });

export const deleteList = (id) => axios.delete(`/lists/${id}`);

export const addTask = (task) => axios.post("/tasks", task);

export const editTitleList = (id, name) =>
  axios.patch(`/lists/${id}`, {
    name,
  });
