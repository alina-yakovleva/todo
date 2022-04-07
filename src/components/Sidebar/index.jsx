import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import * as api from "../../api";

import AddList from "../AddList";
import { ListIcon } from "../Icons";

import "./Sidebar.scss";
import Folders from "../Folders";

const SideBar = () => {
  const [folders, setFolders] = useState([]);
  const [colors, setColors] = useState([]);
  const navigate = useNavigate();
  const { folderId } = useParams();

  useEffect(() => {
    api.getFolders().then(setFolders);
    api.getColors().then(setColors);
  }, []);

  const onAddList = (obj) => {
    setFolders([...folders, obj]);
  };

  const onRemove = (id) => {
    const newLists = folders.filter((item) => item.id !== id);
    setFolders(newLists);
  };

  return (
    <div className="todo__sidebar">
      <Folders
        onClickItem={() => navigate("/")}
        selectedId={!folderId ? "default_id" : undefined}
        items={[
          {
            id: "default_id",
            icon: <ListIcon />,
            name: "Все задачи",
          },
        ]}
      />
      <Folders
        items={folders}
        selectedId={Number(folderId)}
        onRemove={onRemove}
        onClickItem={(item) => navigate(`/tasks/${item.id}`)}
      />
      <AddList onAdd={onAddList} colors={colors} />
    </div>
  );
};
export default SideBar;
