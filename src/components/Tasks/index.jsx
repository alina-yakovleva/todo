import "./Tasks.scss";
import axios from "axios";
import AddTaskForm from "./AddTaskForm";
import editSvg from "../../img/edit.svg";

const Tasks = ({ list, onEditTitle, onAddTask }) => {
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
    <div className="todo__tasks">
      <div className="tasks">
        <h2 className="tasks__title">
          {list.name}
          <img onClick={editTitle} src={editSvg} alt="edit" />
        </h2>
        <div className="tasks__items">
          {!list.tasks.length && <h2>Задача отсутсвуют</h2>}
          {list.tasks.map((task) => {
            const taskId = `task-${task.id}`;

            return (
              <div key={task.id} className="tasks__items-row">
                <div className="checkbox">
                  <input id={taskId} type="checkbox" />
                  <label htmlFor={taskId}>
                    <svg
                      width="11"
                      height="8"
                      viewBox="0 0 11 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                        stroke="black"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </label>
                </div>
                <p>{task.text}</p>
              </div>
            );
          })}
          <AddTaskForm list={list} onAddTask={onAddTask} />
        </div>
      </div>
    </div>
  );
};
export default Tasks;
