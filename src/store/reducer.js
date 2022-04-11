import {
  ADD_FOLDER,
  EDIT_ALL_TASK,
  EDIT_TITLE_FOLDER,
  REMOVE_ALL_TASK,
  REMOVE_FOLDER,
  SET_COLORS,
  SET_FOLDERS,
  SET_TASKS,
  COMPLETE_ALL_TASK,
  ADD_TASK,
  EDIT_TASK,
  COMPLETE_TASK,
  REMOVE_TASK,
  SET_FOLDERS_LOADING,
  SET_TASKS_LOADING,
} from "./constants";

const initialState = {
  folders: [],
  isFoldersLoading: false,
  colors: [],
  tasks: [],
  isTasksLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOLDERS:
      return { ...state, folders: action.payload };
    case SET_COLORS:
      return { ...state, colors: action.payload };
    case REMOVE_FOLDER: {
      const id = action.payload;

      return {
        ...state,
        folders: state.folders.filter((item) => item.id !== id),
      };
    }
    case ADD_FOLDER: {
      const folderWithoutColor = action.payload;

      const color = state.colors.find(
        (c) => c.id === folderWithoutColor.colorId
      );

      const folder = { ...folderWithoutColor, color };

      return {
        ...state,
        folders: [...state.folders, folder],
      };
    }
    case EDIT_TITLE_FOLDER: {
      const { folderId, name } = action.payload;

      return {
        ...state,
        folders: state.folders.map((folder) =>
          folder.id === folderId ? { ...folder, name } : folder
        ),
      };
    }
    case SET_TASKS:
      return { ...state, tasks: action.payload };
    case REMOVE_ALL_TASK: {
      const id = action.payload;

      return { ...state, tasks: state.tasks.filter((item) => item.id !== id) };
    }
    case EDIT_ALL_TASK: {
      const { id, text } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === id ? { ...item, text } : item
        ),
      };
    }
    case COMPLETE_ALL_TASK: {
      const updatedTask = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === updatedTask.id ? updatedTask : item
        ),
      };
    }
    case ADD_TASK: {
      const task = action.payload;
      return { ...state, tasks: [...state.tasks, task] };
    }

    case EDIT_TASK: {
      const { id, text } = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === id ? { ...item, text } : item
        ),
      };
    }
    case COMPLETE_TASK: {
      const updatedTask = action.payload;
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === updatedTask.id ? updatedTask : item
        ),
      };
    }
    case REMOVE_TASK: {
      const id = action.payload;
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== id),
      };
    }
    case SET_FOLDERS_LOADING: {
      return { ...state, isFoldersLoading: action.payload };
    }
    case SET_TASKS_LOADING: {
      return { ...state, isTasksLoading: action.payload };
    }
    default:
      return state;
  }
};
export default reducer;
