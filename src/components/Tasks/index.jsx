import axios from "axios";

import AddTaskForm from "./AddTaskForm";
import { EditSvg } from "../Icons";

import Task from "./Task";

import "./Tasks.scss";

const Tasks = ({
  list,
  onEditTitle,
  onEdit,
  onAddTask,
  withoutEmpty,
  onRemove,
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
        <EditSvg onClick={editTitle} />
      </h2>
      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && (
          <h2>Задача отсутсвуют</h2>
        )}
        {list.tasks &&
          list.tasks.map((task) => (
            <Task
              onCompleteTask={onCompleteTask}
              list={list}
              onEdit={onEdit}
              onRemove={onRemove}
              task={task}
              {...task}
            />
          ))}
        <AddTaskForm list={list} key={list.id} onAddTask={onAddTask} />
      </div>
    </div>
  );
};
export default Tasks;
