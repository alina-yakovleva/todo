import { Tasks } from "../components";

const SideBar = ({ lists, onCompleteTask, onAddTask, onEditListTitle }) => {
  return (
    <>
      {lists?.map((list) => (
        <Tasks
          onCompleteTask={onCompleteTask}
          list={list}
          onAddTask={onAddTask}
          onEditTitle={onEditListTitle}
          key={list.id}
          withoutEmpty
        />
      ))}
    </>
  );
};
export default SideBar;
