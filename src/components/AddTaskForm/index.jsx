import { useState } from "react";

import { AddIcon } from "../Icons";

import "./AddTaskForm.scss";

const AddTaskForm = ({ onSubmit }) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState("");

  const onToggle = () => {
    setEdit(!edit);
    setValue("");
  };

  const handleSubmit = (name) => {
    onSubmit(name);
    onToggle();
  };

  return (
    <div className="tasks__form">
      {!edit ? (
        <div onClick={onToggle} className="tasks__form-new">
          <AddIcon />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            value={value}
            className="field"
            placeholder="Текст задачи"
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={() => handleSubmit(value)} className="button">
            Добавить задачу
          </button>
          <button onClick={onToggle} className="button button--grey">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};
export default AddTaskForm;
