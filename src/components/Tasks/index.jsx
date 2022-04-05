import AddTaskForm from "./AddTaskForm";

import Task from "./Task";

import "./Tasks.scss";

const Tasks = ({ list, onEdit, onAddTask, onRemove, onCompleteTask }) => {
  return (
    <div className="tasks">
      <div className="tasks__items">
        {list.map((task) => (
          <Task
            onCompleteTask={onCompleteTask}
            onRemove={onRemove}
            onEdit={onEdit}
            key={task.id}
            task={task}
          />
        ))}
        <AddTaskForm list={list} key={list.id} onAddTask={onAddTask} />
      </div>
    </div>
  );
};
export default Tasks;
