import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { completeTask, editTask, getAllTasks, removeTask } from "../../api";

import {
  COMPLETE_ALL_TASK,
  EDIT_ALL_TASK,
  REMOVE_ALL_TASK,
  SET_TASKS,
} from "../../store/constants";

import Task from "../Task";

const AllTasks = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const onRemove = (id) => {
    removeTask(id).then(() => dispatch({ type: REMOVE_ALL_TASK, payload: id }));
  };

  const onEdit = (id, text) => {
    editTask(id, text).then((data) => {
      const text = window.prompt("Введите задачу");
      dispatch({ type: EDIT_ALL_TASK, payload: { id, text } });
    });
  };

  const onCompleteTask = (id, completed) => {
    completeTask(id, completed).then((updatedTask) => {
      dispatch({ type: COMPLETE_ALL_TASK, payload: updatedTask });
    });
  };

  useEffect(() => {
    getAllTasks().then((data) => dispatch({ type: SET_TASKS, payload: data }));
  }, []);

  return (
    <div style={{ flex: 1 }}>
      <div className="todo__tasks">
        <div className="tasks">
          <div className="tasks__items">
            {tasks.map((task) => (
              <Task
                onCompleteTask={onCompleteTask}
                onRemove={() => onRemove(task.id)}
                onEdit={() => onEdit(task.id, task.text)}
                key={task.id}
                task={task}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllTasks;
