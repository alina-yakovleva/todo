import classNames from "classnames";

import Badge from "../Badge";
import { RemoveIcon } from "../Icons";

import "./Folders.scss";

const Folders = ({ items, onRemove, onSelect, selectedId }) => {
  return (
    <ul className="list">
      {items.map((item, index) => (
        <li
          onClick={onSelect ? () => onSelect(item.id) : null}
          key={index}
          className={classNames(item.className, {
            active: item.id === selectedId,
          })}
        >
          <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
          <span>{item.name}</span>

          {onRemove && (
            <RemoveIcon
              className="list__remove-icon"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(item.id);
              }}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default Folders;
