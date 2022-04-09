import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import * as actions from "../../store/actions";

import Folders from "../Folders";
import { AddIcon, ListIcon } from "../Icons";
import CreateFolderPopover from "../CreateFolderPopover";

import "./Sidebar.scss";
import Loader from "../Loader";

const SideBar = () => {
  const folders = useSelector((state) => state.folders);
  const colors = useSelector((state) => state.colors);
  const isFoldersLoading = useSelector((state) => state.isFoldersLoading);
  const [open, setOpen] = useState(false);

  const { folderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(actions.getFoldersAsync());
    dispatch(actions.getColorsAsync());
  }, []);

  const onRemove = (id) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      dispatch(actions.removeFolderAsync(id));

      if (Number(folderId) === id) {
        navigate("/");
      }
    }
  };

  const onSubmit = (colorId, name) => {
    dispatch(actions.addFolderAsync(colorId, name));
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
      {isFoldersLoading ? (
        <Loader />
      ) : (
        <Folders
          items={folders}
          selectedId={Number(folderId)}
          onRemove={onRemove}
          onSelect={(id) => navigate(`/tasks/${id}`)}
        />
      )}
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
