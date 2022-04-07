import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFolder } from "../../api";

import { EditIcon } from "../Icons";

import "./FolderTitle.scss";

const FolderTitle = () => {
  const [folder, setFolder] = useState(null);
  const { folderId } = useParams();

  useEffect(() => {
    getFolder(folderId).then(setFolder);
  }, [folderId]);

  const onEdit = () => {};

  return (
    <h2 style={{ color: folder?.color?.hex }} className="folder__title">
      {folder?.name}
      <EditIcon onClick={onEdit} />
    </h2>
  );
};

export default FolderTitle;
