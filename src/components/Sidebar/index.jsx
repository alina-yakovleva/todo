import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import * as api from "../../api";

import Folders from "../Folders";
import { AddIcon, ListIcon } from "../Icons";
import CreateFolderPopover from "../CreateFolderPopover";

import {
  SET_FOLDERS,
  SET_COLORS,
  REMOVE_FOLDER,
  ADD_FOLDER,
} from "../../store/constants";

import "./Sidebar.scss";

const SideBar = () => {
  const folders = useSelector((state) => state.folders);
  const colors = useSelector((state) => state.colors);
  const [open, setOpen] = useState(false);

  const { folderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getFolders()
      .then((data) => dispatch({ type: SET_FOLDERS, payload: data }));
    api
      .getColors()
      .then((data) => dispatch({ type: SET_COLORS, payload: data }));
  }, []);

  const onRemove = (id) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      api.deleteFolder(id).then(() => {
        dispatch({ type: REMOVE_FOLDER, payload: id });

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
        dispatch({ type: ADD_FOLDER, payload: folderWithoutColor })
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
