import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import * as api from "./api";

import { List, AddList } from "./components";
import { ListIcon } from "./components/Icons";

import SideBar from "./SideBar/SideBar";
import CurrentTasks from "./CurrentTasks/CurrentTasks";

import "./index.scss";

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    api.getFolders().then(setLists);

    api.getColors().then(setColors);
  }, []);

  useEffect(() => {
    const listId = window.location.pathname.split("lists/")[1];
    const newItem = lists?.filter((item) => item.id === Number(listId))[0];

    if (newItem) {
      setActiveItem(newItem);
    }
  }, [lists, window.location.pathname]);

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setLists(newList);
  };
  const onEditListTitle = (id, title) => {
    const newList = lists.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });

    // const newItem = newList.find((item) => item.id === id);

    setLists(newList);
    // setActiveItem(newItem);
  };
  const onRemoveTask = (listId, taskId) => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      const newList = lists.map((item) => {
        if (item.id === listId) {
          item.tasks = item.tasks.filter((task) => task.id !== taskId);
        }
        return item;
      });
      setLists(newList);
      api.removeTask(taskId);
    }
  };
  const onEditTask = (listId, taskObj) => {
    const newTaskText = window.prompt("Текст задачи", taskObj.text);
    if (!newTaskText) {
      return;
    }
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.map((task) => {
          if (task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newList);
    api.editTask(taskObj.id, newTaskText);
  };
  const onCompleteTask = (listId, taskId, completed) => {
    const newList = lists.map((item) => {
      if (item.id === listId) {
        item.tasks = item.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return item;
    });
    setLists(newList);
    api.completeTask(taskId, completed);
  };
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          onClickItem={(item) => navigate("/")}
          items={[
            {
              active: !activeItem,
              icon: <ListIcon />,
              name: "Все задачи",
            },
          ]}
        />
        <List
          items={lists}
          activeItem={activeItem}
          isRemovable
          onRemove={(id) => {
            const newLists = lists.filter((item) => item.id !== id);
            setLists(newLists);
          }}
          onClickItem={(item) => navigate(`/lists/${item.id}`)}
        />
        <AddList onAdd={onAddList} colors={colors} />
      </div>
      <div className="todo__tasks">
        <Routes>
          <Route
            index
            path="/"
            element={
              <SideBar
                lists={lists}
                onCompleteTask={onCompleteTask}
                onAddTask={onAddTask}
                onEditTitle={onEditListTitle}
              />
            }
          />
          <Route
            path="/lists/:id"
            element={
              <CurrentTasks
                lists={lists}
                onCompleteTask={onCompleteTask}
                onEdit={onEditTask}
                onRemove={onRemoveTask}
                activeItem={activeItem}
                onAddTask={onAddTask}
                onEditListTitle={onEditListTitle}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
