import { axios } from "./config";

export const removeTask = (taskId) =>
  axios.delete(`/tasks/${taskId}`).then(({ data }) => data);

export const editTask = (taskId, text) =>
  axios
    .patch(`/tasks/${taskId}`, {
      text,
    })
    .then(({ data }) => data);

export const completeTask = (taskId, completed) =>
  axios
    .patch(`/tasks/${taskId}`, {
      completed,
    })
    .then(({ data }) => data);

export const addTask = (task) =>
  axios.post("/tasks", task).then(({ data }) => data);

export const getTasks = (folderId) =>
  axios.get(`/tasks?folderId=${folderId}`).then(({ data }) => data);

export const getAllTasks = () => axios.get("/tasks").then(({ data }) => data);
