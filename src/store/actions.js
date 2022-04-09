import {
  ADD_FOLDER,
  ADD_TASK,
  COMPLETE_TASK,
  EDIT_ALL_TASK,
  EDIT_TASK,
  EDIT_TITLE_FOLDER,
  REMOVE_ALL_TASK,
  REMOVE_FOLDER,
  REMOVE_TASK,
  SET_COLORS,
  SET_FOLDERS,
  SET_TASKS,
} from "./constants";

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

export const removeAllTask = (id) => ({ type: REMOVE_ALL_TASK, payload: id });

export const editAllTask = (id, text) => ({
  type: EDIT_ALL_TASK,
  payload: { id, text },
});

export const completeAllTask = (data) => ({
  type: COMPLETE_TASK,
  payload: data,
});
