import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import AllTasks from "./components/AllTasks";
import FolderTasks from "./components/FolderTasks";

import "./index.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<AllTasks />} />
        <Route path="/tasks/:folderId" element={<FolderTasks />} />
      </Route>
    </Routes>
  );
}

export default App;
