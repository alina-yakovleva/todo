import { useState } from "react";
import Badge from "../Badge";
import { CloseIcon } from "../Icons";

const CreateFolderPopover = ({ colors, onClose, onSubmit, open }) => {
  const [value, setValue] = useState("");
  const [colorId, setColorId] = useState(1);

  if (!open) {
    return null;
  }

  return (
    <div className="add-list__popup">
      <CloseIcon onClick={onClose} className="add-list__popup-close-btn" />

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="field"
        placeholder="Название папки"
      />
      <div className="add-list__popup-colors">
        {colors.map((color) => (
          <Badge
            onClick={() => setColorId(color.id)}
            key={color.id}
            color={color.name}
            className={colorId === color.id && "active"}
          />
        ))}
      </div>
      <button onClick={() => onSubmit(colorId, value)} className="button">
        Добавить
      </button>
    </div>
  );
};
export default CreateFolderPopover;
