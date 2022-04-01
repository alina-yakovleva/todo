import axios from "axios";

export const getTodos = () =>
  axios
    .get("http://localhost:3001/lists?_expand=color&_embed=tasks")
    .then(({ data }) => data);

export const getColors = () =>
  axios.get("http://localhost:3001/colors").then(({ data }) => data);

export const removeTask = (taskId) =>
  axios.delete("http://localhost:3001/tasks/" + taskId).catch(() => {
    alert("Не удалось удалить задачу");
  });

export const editTask = (taskObj, newTaskText) =>
  axios
    .patch("http://localhost:3001/tasks/" + taskObj.id, {
      text: newTaskText,
    })
    .catch(() => {
      alert("Не удалось удалить задачу");
    });

export const completeTask = (taskId, completed) =>
  axios
    .patch("http://localhost:3001/tasks/" + taskId, {
      completed,
    })
    .catch(() => {
      alert("Не удалось удалить задачу");
    });

export const addLists = (inputValue, selectedColor) =>
  axios.post("http://localhost:3001/lists", {
    name: inputValue,
    colorId: selectedColor,
  });

export const deleteList = (item) =>
  axios.delete("http://localhost:3001/lists/" + item.id);

export const addTask = (obj) => axios.post("http://localhost:3001/tasks", obj);

export const editTitleList = (list, newTitle) =>
  axios.patch("http://localhost:3001/lists/" + list.id, {
    name: newTitle,
  });
