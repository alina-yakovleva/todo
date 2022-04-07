import classNames from "classnames";

import Badge from "../Badge";
import { RemoveIcon } from "../Icons";

import { deleteFolder } from "../../api";

import "./Folders.scss";

const Folders = ({ items, onClick, onRemove, onClickItem, selectedId }) => {
  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      deleteFolder(item.id).then(() => onRemove(item.id));
    }
  };

  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          onClick={onClickItem ? () => onClickItem(item) : null}
          key={index}
          className={classNames(item.className, {
            active: item.id === selectedId,
          })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>{item.name}</span>

          <RemoveIcon
            className="list__remove-icon"
            onClick={() => removeList(item)}
          />
        </li>
      ))}
    </ul>
  );
};

export default Folders;
