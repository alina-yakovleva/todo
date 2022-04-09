import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import * as actions from "../../store/actions";

import FolderTitle from "../FolderTitle";
import AddTaskForm from "../AddTaskForm";
import Task from "../Task";

import "./FolderTasks.scss";

import Loader from "../Loader";

const FolderTasks = () => {
  const { folderId } = useParams();

  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const isTasksLoading = useSelector((state) => state.isTasksLoading);

  useEffect(() => {
    dispatch(actions.getFolderTasksAsync(folderId));
  }, [folderId]);

  const onAddTask = (text) => {
    const taskData = {
      folderId: Number(folderId),
      text,
      completed: false,
    };

    dispatch(actions.addTaskAsync(taskData));
  };

  const onRemove = (id) => {
    dispatch(actions.removeTaskAsync(id));
  };
  const onEdit = (id) => {
    const text = window.prompt("Введите задачу");
    if (text) {
      dispatch(actions.editTaskAsync(id, text));
    }
  };
  const onCompleteTask = (id, completed) => {
    dispatch(actions.completeTaskAsync(id, completed));
  };

  return (
    <div style={{ flex: 1 }}>
      <FolderTitle />
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
              <AddTaskForm onSubmit={onAddTask} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FolderTasks;
