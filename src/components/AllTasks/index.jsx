import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as api from "../../api";
import * as actions from "../../store/actions";

import Task from "../Task";

const AllTasks = () => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const onRemove = (id) => {
    api.removeTask(id).then(() => dispatch(actions.removeAllTask(id)));
  };

  const onEdit = (id, text) => {
    api.editTask(id, text).then((data) => {
      const text = window.prompt("Введите задачу");
      dispatch(actions.editAllTask(id, text));
    });
  };

  const onCompleteTask = (id, completed) => {
    api.completeTask(id, completed).then((updatedTask) => {
      dispatch(actions.completeAllTask(updatedTask));
    });
  };

  useEffect(() => {
    api.getAllTasks().then((data) => dispatch(actions.setTasks(data)));
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
