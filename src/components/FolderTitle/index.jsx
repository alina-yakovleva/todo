import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editFolder, getFolder } from "../../api";
import { editTitle } from "../../store/actions";
import { EDIT_TITLE_FOLDER } from "../../store/constants";

import { EditIcon } from "../Icons";

import "./FolderTitle.scss";

const FolderTitle = () => {
  const { folderId } = useParams();
  const dispatch = useDispatch();
  const folders = useSelector((state) => state.folders);

  const folder = folders.find((item) => item.id === Number(folderId));

  const onEditTitle = () => {
    const name = window.prompt("Введите название папки");
    if (name) {
      editFolder(folder.id, name).then(() => {
        dispatch(editTitle({ folderId: folder.id, name }));
      });
    }
  };
  return (
    <h2 style={{ color: folder?.color?.hex }} className="folder__title">
      {folder?.name}
      <EditIcon onClick={onEditTitle} />
    </h2>
  );
};

export default FolderTitle;
