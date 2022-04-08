import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  addTask,
  completeTask,
  editTask,
  getTasks,
  removeTask,
} from "../../api";
import FolderTitle from "../FolderTitle";
import AddTaskForm from "../AddTaskForm";
import Task from "../Task";

import "./FolderTasks.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TASK,
  COMPLETE_TASK,
  EDIT_TASK,
  REMOVE_TASK,
  SET_TASKS,
} from "../../store/constants";

const FolderTasks = () => {
  // const [tasks, setTasks] = useState([]);
  const { folderId } = useParams();

  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  useEffect(() => {
    getTasks(folderId).then((data) =>
      dispatch({ type: SET_TASKS, payload: data })
    );
  }, [folderId]);

  const onAddTask = (text) => {
    const taskData = {
      folderId: Number(folderId),
      text,
      completed: false,
    };

    addTask(taskData).then((task) =>
      dispatch({ type: ADD_TASK, payload: task })
    );
  };
  const onRemove = (id) => {
    removeTask(id).then(() => {
      dispatch({ type: REMOVE_TASK, payload: id });
    });
  };
  const onEdit = (id) => {
    const text = window.prompt("Введите задачу");
    if (text) {
      editTask(id, text).then(() => {
        dispatch({ type: EDIT_TASK, payload: { id, text } });
      });
    }
  };
  const onCompleteTask = (id, completed) => {
    completeTask(id, completed).then((updatedTask) => {
      dispatch({ type: COMPLETE_TASK, payload: updatedTask });
    });
  };

  return (
    <div style={{ flex: 1 }}>
      <FolderTitle />
      <div className="todo__tasks">
        <div className="tasks">
          <div className="tasks__items">
            {tasks.map((task) => (
              <Task
                onCompleteTask={onCompleteTask}
                onRemove={() => onRemove(task.id)}
                onEdit={onEdit}
                key={task.id}
                task={task}
              />
            ))}
            <AddTaskForm onSubmit={onAddTask} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FolderTasks;
