import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editFolder, getFolder } from "../../api";

import { EditIcon } from "../Icons";

import "./FolderTitle.scss";

const FolderTitle = () => {
  const [folder, setFolder] = useState(null);
  const { folderId } = useParams();

  useEffect(() => {
    getFolder(folderId).then(setFolder);
  }, [folderId]);

  const onEditTitle = (id, name) => {
    editFolder(id, name).then(() => {
      const result = window.prompt("Введите название папки");
      const newTitles =
        folder.id === id ? { ...folder, name: result } : folder.name;

      setFolder(newTitles);
    });
  };
  return (
    <h2 style={{ color: folder?.color?.hex }} className="folder__title">
      {folder?.name}
      <EditIcon onClick={() => onEditTitle(folder.id, folder.name)} />
    </h2>
  );
};

export default FolderTitle;
