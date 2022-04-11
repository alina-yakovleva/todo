import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";
import Loader from "../Loader";

import Task from "../Task";

import "./AllTasks.scss";

const AllTasks = () => {
  const isTasksLoading = useSelector((state) => state.isTasksLoading);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const onRemove = (id) => {
    dispatch(actions.removeTaskAsync(id));
  };

  const onEdit = (id) => {
    const text = window.prompt("Введите задачу");
    dispatch(actions.editTaskAsync(id, text));
  };

  const onCompleteTask = (id, completed) => {
    dispatch(actions.completeTaskAsync(id, completed));
  };

  useEffect(() => {
    dispatch(actions.getFolderAllTasksAsync());
  }, []);

  if (!tasks.length) {
    return <p className="task__text">Нет текущих задач</p>;
  }
  return (
    <div style={{ flex: 1 }}>
      {isTasksLoading ? (
        <Loader />
      ) : (
        <div className="todo__tasks">
          <div className="tasks">
            <div className="tasks__items">
              {tasks.map((task) => (
                <Task
                  onCompleteTask={onCompleteTask}
                  onRemove={() => onRemove(task.id)}
                  onEdit={() => onEdit(task.id)}
                  key={task.id}
                  task={task}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTasks;
