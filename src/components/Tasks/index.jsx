import "./Tasks.scss";

import editSvg from "../../img/edit.svg";

const Tasks = ({ list }) => {
  return (
    <div className="todo__tasks">
      <div className="tasks">
        <h2 className="tasks__title">
          {list.name}
          <img src={editSvg} alt="edit" />
        </h2>
        <div className="tasks__items">
          {list.tasks.map((task) => {
            const taskId = `task- ${task.id}`;

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
        </div>
      </div>
    </div>
  );
};
export default Tasks;
