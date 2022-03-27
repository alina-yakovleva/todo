import "./List.scss";
import classNames from "classnames";

import "../AddList/AddList.scss";
import Badge from "../Badge/Badge";
import removeSvg from "../../img/remove.svg";

export const List = ({ items, isRemovable, onClick, onRemove }) => {
  const removeList = (item) => {
    if (window.confirm("Вы действительно хотите удалить список?")) {
      onRemove(item);
    }
  };
  return (
    <ul onClick={onClick} className="list">
      {items.map((item, index) => (
        <li
          key={index}
          className={classNames(item.className, { active: item.active })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color} />}</i>
          <span>{item.name}</span>
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
