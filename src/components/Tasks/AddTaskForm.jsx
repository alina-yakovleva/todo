import { useState } from "react";

import { addTask } from "../../api";
import { AddSvg } from "../Icons";

import "./AddTaskForm.scss";

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue("");
  };

  const handleAddTask = () => {
    const obj = {
      folderId: list.id,
      text: inputValue,
      completed: false,
    };

    setIsLoading(true);
    addTask(obj)
      .then(({ data }) => {
        onAddTask(list.id, data);
        toggleFormVisible();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <AddSvg />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            value={inputValue}
            className="field"
            placeholder="Текст задачи"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            disabled={isLoading}
            onClick={handleAddTask}
            className="button"
          >
            {isLoading ? "Добавление задачи" : "Добавить задачу"}
          </button>
          <button onClick={toggleFormVisible} className="button button--grey">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};
export default AddTaskForm;
