import { Tasks } from "../components";

import "./AllTasks.scss";

const AllTasks = ({ lists, onCompleteTask, onAddTask, onEditListTitle }) => {
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
export default AllTasks;
