import classNames from "classnames";

import Badge from "../Badge";
import { RemoveSvg } from "../Icons";

import { deleteFolder } from "../../api";

import "./List.scss";

const List = ({ items, onClick, onRemove, onClickItem, selectedId }) => {
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

          <RemoveSvg
            className="list__remove-icon"
            onClick={() => removeList(item)}
          />
        </li>
      ))}
    </ul>
  );
};

export default List;
