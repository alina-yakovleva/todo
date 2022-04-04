import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import * as api from "./api";

import { List, AddList } from "./components";
import { ListIcon } from "./components/Icons";

import SideBar from "./SideBar/SideBar";
import CurrentTasks from "./CurrentTasks/CurrentTasks";

import "./index.scss";

function App() {
  const [folders, setFolders] = useState([]);
  const [colors, setColors] = useState([]);

  const [activeItem, setActiveItem] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    api.getFolders().then(setFolders);

    api.getColors().then(setColors);
  }, []);

  useEffect(() => {
    const folderId = window.location.pathname.split("lists/")[1];
    const newItem = folders?.filter((item) => item.id === Number(folderId))[0];

    if (newItem) {
      setActiveItem(newItem);
    }
  }, [folders, window.location.pathname]);

  const onAddList = (obj) => {
    setFolders([...folders, obj]);
  };

  const onAddTask = (folderId, taskObj) => {
    const newList = folders.map((item) => {
      if (item.id === folderId) {
        item.tasks = [...item.tasks, taskObj];
      }
      return item;
    });
    setFolders(newList);
  };
  const onEditListTitle = (id, title) => {
    const newList = folders.map((item) => {
      if (item.id === id) {
        item.name = title;
      }
      return item;
    });

    setFolders(newList);
  };
  const onRemoveTask = (folderId, taskId) => {
    if (window.confirm("Вы действительно хотите удалить задачу?")) {
      const newList = folders.map((item) => {
        if (item.id === folderId) {
          item.tasks = item.tasks.filter((task) => task.id !== taskId);
        }
        return item;
      });
      setFolders(newList);
      api.removeTask(taskId);
    }
  };
  const onEditTask = (folderId, taskObj) => {
    const newTaskText = window.prompt("Текст задачи", taskObj.text);
    if (!newTaskText) {
      return;
    }
    const newList = folders.map((item) => {
      if (item.id === folderId) {
        item.tasks = item.tasks.map((task) => {
          if (task.id === taskObj.id) {
            task.text = newTaskText;
          }
          return task;
        });
      }
      return item;
    });
    setFolders(newList);
    api.editTask(taskObj.id, newTaskText);
  };
  const onCompleteTask = (folderId, taskId, completed) => {
    const newList = folders.map((item) => {
      if (item.id === folderId) {
        item.tasks = item.tasks.map((task) => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return item;
    });
    setFolders(newList);
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
          items={folders}
          activeItem={activeItem}
          isRemovable
          onRemove={(id) => {
            const newLists = folders.filter((item) => item.id !== id);
            setFolders(newLists);
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
                lists={folders}
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
                lists={folders}
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
