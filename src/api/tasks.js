import { axios } from "./config";

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

export const addTask = (task) =>
  axios.post("/tasks", task).catch(() => alert("Ошибка при добавлении задачи"));
