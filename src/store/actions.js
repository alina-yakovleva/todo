import {
  ADD_FOLDER,
  ADD_TASK,
  COMPLETE_TASK,
  EDIT_TASK,
  EDIT_TITLE_FOLDER,
  REMOVE_FOLDER,
  REMOVE_TASK,
  SET_COLORS,
  SET_FOLDERS,
  SET_FOLDERS_LOADING,
  SET_TASKS,
  SET_TASKS_LOADING,
} from "./constants";

import * as api from "../api";

export const addFolderAction = (folder) => ({
  type: ADD_FOLDER,
  payload: folder,
});

export const setFolders = (folders) => ({
  type: SET_FOLDERS,
  payload: folders,
});
export const setColors = (color) => ({ type: SET_COLORS, payload: color });
export const removeFolder = (id) => ({ type: REMOVE_FOLDER, payload: id });

export const editTitle = (data) => ({
  type: EDIT_TITLE_FOLDER,
  payload: data,
});

export const setTasks = (tasks) => ({ type: SET_TASKS, payload: tasks });

export const addTask = (task) => ({ type: ADD_TASK, payload: task });

export const removeTask = (id) => ({ type: REMOVE_TASK, payload: id });

export const editTask = (id, text) => ({
  type: EDIT_TASK,
  payload: { id, text },
});

export const completeTask = (data) => ({
  type: COMPLETE_TASK,
  payload: data,
});

export const setFoldersLoading = (value) => ({
  type: SET_FOLDERS_LOADING,
  payload: value,
});
export const setTasksLoading = (value) => ({
  type: SET_TASKS_LOADING,
  payload: value,
});

export const getFoldersAsync = () => async (dispatch) => {
  dispatch(setFoldersLoading(true));
  try {
    const folders = await api.getFolders();
    dispatch(setFolders(folders));
  } catch (e) {
    alert("Ошибка при запросе списка папок");
  } finally {
    dispatch(setFoldersLoading(false));
  }
};

export const getColorsAsync = () => async (dispatch) => {
  try {
    const colors = await api.getColors();
    dispatch(setColors(colors));
  } catch (e) {
    alert("Ошибка при запросе цветов");
  }
};
export const getFolderTasksAsync = (folderId) => async (dispatch) => {
  dispatch(setTasksLoading(true));
  try {
    const tasks = await api.getAllTasks(folderId);
    dispatch(setTasks(tasks));
  } catch (e) {
    alert("Ошибка при получении списка задач");
  } finally {
    dispatch(setTasksLoading(false));
  }
};

export const removeFolderAsync = (id) => async (dispatch) => {
  try {
    await api.deleteFolder(id);
    dispatch(removeFolder(id));
  } catch (e) {
    alert("Ошибка при удалении папки");
  }
};

export const addFolderAsync = (colorId, name) => async (dispatch) => {
  try {
    const folder = await api.addFolder(name, colorId);
    dispatch(addFolderAction(folder));
  } catch (e) {
    alert("Ошибка при добавлении папки");
  }
};

export const removeTaskAsync = (id) => async (dispatch) => {
  try {
    await api.removeTask(id);
    dispatch(removeTask(id));
  } catch (e) {
    alert("Не удалось удалить задачу");
  }
};

export const editTaskAsync = (id, text) => async (dispatch) => {
  try {
    await api.editTask(id, text);
    dispatch(editTask(id, text));
  } catch (e) {
    alert("Не удалось изменить задачу");
  }
};

export const completeTaskAsync = (id, completed) => async (dispatch) => {
  try {
    const tasks = await api.completeTask(id, completed);
    dispatch(completeTask(tasks));
  } catch (e) {
    alert("Не удалось выполнить задачу");
  }
};

export const addTaskAsync = (data) => async (dispatch) => {
  try {
    const task = await api.addTask(data);
    dispatch(addTask(task));
  } catch (e) {
    alert("Ошибка при добавлении задачи");
  }
};

export const editFolderTitleAsync = (folderId, name) => async (dispatch) => {
  try {
    await api.editFolder(folderId, name);
    dispatch(editTitle({ folderId, name }));
  } catch (e) {
    alert("Не удалось изменить название папки");
  }
};
