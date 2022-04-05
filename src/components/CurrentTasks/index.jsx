import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Tasks } from "..";
import { getTasks } from "../../api";
import FolderTitle from "../FolderTitle";

import "./CurrentTasks.scss";

const CurrentTasks = () => {
  const [tasks, setTasks] = useState([]);
  const { folderId } = useParams();

  useEffect(() => {
    getTasks(folderId).then(setTasks);
  }, [folderId]);

  return (
    <div style={{ flex: 1 }}>
      <FolderTitle />
      <div className="todo__tasks">
        <Tasks
          onCompleteTask={() => {}}
          onEdit={() => {}}
          onRemove={() => {}}
          list={tasks}
          onAddTask={() => {}}
          onEditTitle={() => {}}
        />
      </div>
    </div>
  );
};
export default CurrentTasks;
