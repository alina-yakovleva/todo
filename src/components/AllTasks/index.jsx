import { useEffect, useState } from "react";
import { completeTask, editTask, getAllTasks, removeTask } from "../../api";
import Task from "../Task";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);

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

  useEffect(() => {
    getAllTasks().then(setTasks);
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
