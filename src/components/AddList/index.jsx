import React, { useState } from "react";
import { List } from "../List";
import Badge from "../Badge/Badge";
import closeSvg from "../../img/close.svg";

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(true);
  const [selectColor, setSelectColor] = useState(colors[0].id);
  const [inputValue, setInputValue] = useState("");
  const onClose = () => {
    setVisiblePopup(false);
    setInputValue("");
    setSelectColor(colors[0].id);
  };

  const addList = () => {
    if (!inputValue) {
      alert("Введите название списка");
      return; //оборвет функцию
    }
    const color = colors.filter((c) => c.id === selectColor)[0].name;
    onAdd({
      id: Math.random(),
      name: inputValue,
      color,
    });
    onClose();
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: "list__add-button",
            icon: (
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Добавить папку",
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            onClick={onClose}
            src={closeSvg}
            alt="close button"
            className="add-list__popup-close-btn"
          />
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="field"
            placeholder="Название папки"
          />
          <div className="add-list__popup-colors">
            {colors.map((color) => (
              <Badge
                onClick={() => setSelectColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectColor === color.id && "active"}
              />
            ))}
          </div>
          <button onClick={addList} className="button">
            Добавить
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
