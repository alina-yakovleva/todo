import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import * as api from "../../api";

import { AddIcon, ListIcon } from "../Icons";

import "./Sidebar.scss";
import Folders from "../Folders";
import { addFolder, deleteFolder } from "../../api";
import CreateFolderPopover from "../CreateFolderPopover";

const SideBar = () => {
  const [folders, setFolders] = useState([]);
  const [colors, setColors] = useState([]);
  const [open, setOpen] = useState(false);
  const { folderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.getFolders().then(setFolders);
    api.getColors().then(setColors);
  }, []);

  const onRemove = (id) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      deleteFolder(id).then(() => {
        const newLists = folders.filter((item) => item.id !== id);

        setFolders(newLists);
      });
    }
  };

  const onSubmit = (colorId, name) => {
    addFolder(name, colorId).then((folderWithoutColor) => {
      const color = colors.find((c) => c.id === colorId);
      const folder = { ...folderWithoutColor, color };
      setFolders([...folders, folder]);
    });
  };

  return (
    <div className="todo__sidebar">
      <Folders
        onSelect={() => navigate("/")}
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
        onSelect={(id) => navigate(`/tasks/${id}`)}
      />
      <div className="add-list">
        <Folders
          onSelect={() => setOpen(true)}
          items={[
            {
              className: "list__add-button",
              icon: <AddIcon />,
              name: "Добавить папку",
            },
          ]}
        />

        <CreateFolderPopover
          open={open}
          colors={colors}
          onSubmit={onSubmit}
          onClose={() => setOpen(false)}
        />
      </div>
    </div>
  );
};
export default SideBar;
