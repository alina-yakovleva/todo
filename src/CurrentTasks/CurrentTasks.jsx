import { Tasks } from "../components";

const CurrentTasks = ({
  lists,
  activeItem,
  onCompleteTask,
  onEdit,
  onRemove,
  onAddTask,
  onEditListTitle,
}) => {
  return (
    <>
      {lists && activeItem && (
        <Tasks
          onCompleteTask={onCompleteTask}
          onEdit={onEdit}
          onRemove={onRemove}
          list={activeItem}
          onAddTask={onAddTask}
          onEditTitle={onEditListTitle}
        />
      )}
    </>
  );
};
export default CurrentTasks;
