import "./Tasks.scss";
import axios from "axios";
import AddTaskForm from "./AddTaskForm";
import { Route } from "react-router-dom";
import editSvg from "../../img/edit.svg";
import Task from "./Task";

const Tasks = ({
  list,
  onEditTitle,
  onEditTask,
  onAddTask,
  withoutEmpty,
  onRemoveTask,
  onCompleteTask,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt("Название списка", list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: newTitle,
        })
        .catch(() => alert("Произошла ошибка"));
    }
  };

  return (
    <div className="tasks">
      <h2 style={{ color: list.color.hex }} className="tasks__title">
        {list.name}
        <img onClick={editTitle} src={editSvg} alt="edit" />
      </h2>
      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Задача отсутсвуют</h2>
        )}
        {list.tasks &&
          list.tasks.map((task) => {
            const taskId = `task-${task.id}`;

            return (
              <Task
                onCompleteTask={onCompleteTask}
                list={list}
                onEdit={onEditTask}
                onRemove={onRemoveTask}
                task={task}
                {...task}
                taskId={taskId}
                key={taskId}
              />
            );
          })}
        <AddTaskForm list={list} key={list.id} onAddTask={onAddTask} />
      </div>
    </div>
  );
};
export default Tasks;
