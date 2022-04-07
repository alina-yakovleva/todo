import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  addTask,
  completeTask,
  editFolder,
  editTask,
  getTasks,
  removeTask,
} from "../../api";
import FolderTitle from "../FolderTitle";
import AddTaskForm from "../AddTaskForm";
import Task from "../Task";

import "./FolderTasks.scss";

const FolderTasks = () => {
  const [tasks, setTasks] = useState([]);
  const { folderId } = useParams();

  useEffect(() => {
    getTasks(folderId).then(setTasks);
  }, [folderId]);

  const onAddTask = (text) => {
    const taskData = {
      folderId: Number(folderId),
      text,
      completed: false,
    };

    addTask(taskData).then((task) => setTasks([...tasks, task]));
  };
  const onRemove = (id) => {
    removeTask(id).then(() => {
      const filteredTasks = tasks.filter((task) => task.id !== id);
      setTasks(filteredTasks);
    });
  };
  const onEdit = (id, text) => {
    editTask(id, text).then(() => {
      const resultPromt = window.prompt("Введите задачу");
      const mappedTasks = tasks.map((task) =>
        task.id === id ? { ...task, text: resultPromt } : task
      );
      setTasks(mappedTasks);
    });
  };
  const onCompleteTask = (id, completed) => {
    completeTask(id, completed).then((updatedTask) => {
      const checkedTasks = tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
      setTasks(checkedTasks);
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
