import axios from "axios";
import classNames from "classnames";

import Badge from "../Badge";

import removeSvg from "../../img/remove.svg";

import "../AddList/AddList.scss";
import "./List.scss";
import { deleteList } from "../../api/todos";

const List = ({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem,
}) => {
  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      deleteList(item).then(() => {
        onRemove(item.id);
      });
    }
  };
  return (
    <ul onClick={onClick} className="list">
      {items?.map((item, index) => (
        <li
          onClick={onClickItem ? () => onClickItem(item) : null}
          key={index}
          className={classNames(item.className, {
            active: item.active
              ? item.active
              : activeItem && activeItem.id === item.id,
          })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>
            {item.name}
            {item.tasks && `(${item.tasks.length})`}
          </span>
          {isRemovable && (
            <img
              className="list__remove-icon"
              src={removeSvg}
              alt="remove Icon"
              onClick={() => removeList(item)}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default List;
