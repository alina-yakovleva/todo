import React, { useEffect, useState } from "react";

import List from "../List";
import Badge from "../Badge";
import { addLists } from "../../api/todos";

import { AddIcon, CloseSvg } from "../Icons";

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(3);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue("");
    selectColor(colors[0].id);
  };
  useEffect(() => {});

  const addList = () => {
    if (!inputValue) {
      alert("Введите название списка");
      return; //оборвет функцию
    }
    setIsLoading(true);
    addLists(inputValue, selectedColor)
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0].name;
        const listObj = { ...data, color: { name: color } };

        onAdd(listObj);
        onClose();
      })
      .catch(() => {
        alert("Ошибка при добавлении списка");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: "list__add-button",
            icon: <AddIcon />,
            name: "Добавить папку",
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <CloseSvg onClick={onClose} className="add-list__popup-close-btn" />

          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="field"
            placeholder="Название папки"
          />
          <div className="add-list__popup-colors">
            {colors?.map((color) => (
              <Badge
                onClick={() => selectColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && "active"}
              />
            ))}
          </div>
          <button onClick={addList} className="button">
            {isLoading ? "Добавление..." : "Добавить"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
