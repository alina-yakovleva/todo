import { axios } from "./config";

export const removeTask = (taskId) =>
  axios
    .delete(`/tasks/${taskId}`)
    .then(({ data }) => data)
    .catch(() => alert("Не удалось удалить задачу"));

export const editTask = (taskId, text) =>
  axios
    .patch(`/tasks/${taskId}`, {
      text,
    })
    .then(({ data }) => data)
    .catch(() => alert("Не удалось изменить задачу"));

export const completeTask = (taskId, completed) =>
  axios
    .patch(`/tasks/${taskId}`, {
      completed,
    })
    .then(({ data }) => data)
    .catch(() => alert("Не удалось выполнить задачу"));

export const addTask = (task) =>
  axios
    .post("/tasks", task)
    .then(({ data }) => data)
    .catch(() => alert("Ошибка при добавлении задачи"));

export const getTasks = (folderId) =>
  axios
    .get(`/tasks?folderId=${folderId}`)
    .then(({ data }) => data)
    .catch(() => alert("Ошибка при получении списка задач"));
