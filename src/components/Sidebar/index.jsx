import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import * as api from "../../api";
import * as actions from "../../store/actions";

import Folders from "../Folders";
import { AddIcon, ListIcon } from "../Icons";
import CreateFolderPopover from "../CreateFolderPopover";

import { addFolderAction, removeFolder, setFolders } from "../../store/actions";

import "./Sidebar.scss";

const SideBar = () => {
  const folders = useSelector((state) => state.folders);
  const colors = useSelector((state) => state.colors);
  const [open, setOpen] = useState(false);

  const { folderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    api.getFolders().then((data) => dispatch(setFolders(data)));
    api.getColors().then((data) => dispatch(actions.setColors(data)));
  }, []);

  const onRemove = (id) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      api.deleteFolder(id).then(() => {
        dispatch(actions.removeFolder(id));

        if (Number(folderId) === id) {
          navigate("/");
        }
      });
    }
  };

  const onSubmit = (colorId, name) => {
    api
      .addFolder(name, colorId)
      .then((folderWithoutColor) =>
        dispatch(actions.addFolderAction(folderWithoutColor))
      );
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
