import { CheckSvg, EditSvg, RemoveSvg } from "../Icons";

const Task = ({
  id,
  text,
  list,
  task,

  onRemove,
  onEdit,
  onCompleteTask,
}) => {
  const taskId = `task-${task.id}`;
  return (
    <div className="tasks__items-row">
      <div className="checkbox">
        <input
          id={taskId}
          checked={task.completed}
          onChange={(e) =>
            onCompleteTask(task.listId, task.id, e.target.checked)
          }
          type="checkbox"
        />
        <label htmlFor={taskId}>
          <CheckSvg />
        </label>
      </div>
      <p>{task.text}</p>
      <div className="tasks__items-row-actions">
        <div onClick={() => onEdit(list.id, { id, text })}>
          <EditSvg />
        </div>
        <div onClick={() => onRemove(list.id, id)}>
          <RemoveSvg />
        </div>
      </div>
    </div>
  );
};
export default Task;
