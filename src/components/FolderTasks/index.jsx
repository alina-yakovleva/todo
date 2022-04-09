import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as api from "../../api";
import * as actions from "../../store/actions";
import FolderTitle from "../FolderTitle";
import AddTaskForm from "../AddTaskForm";
import Task from "../Task";

import "./FolderTasks.scss";

const FolderTasks = () => {
  const { folderId } = useParams();

  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    api.getTasks(folderId).then((tasks) => dispatch(actions.setTasks(tasks)));
  }, [folderId]);

  const onAddTask = (text) => {
    const taskData = {
      folderId: Number(folderId),
      text,
      completed: false,
    };

    api.addTask(taskData).then((task) => dispatch(actions.addTask(task)));
  };
  const onRemove = (id) => {
    api.removeTask(id).then(() => {
      dispatch(actions.removeTask(id));
    });
  };
  const onEdit = (id) => {
    const text = window.prompt("Введите задачу");
    if (text) {
      api.editTask(id, text).then(() => {
        dispatch(actions.editTask(id, text));
      });
    }
  };
  const onCompleteTask = (id, completed) => {
    api.completeTask(id, completed).then((updatedTask) => {
      dispatch(actions.completeTask(updatedTask));
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
