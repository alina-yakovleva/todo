import { Routes, Route } from "react-router-dom";
import FolderTasks from "./components/FolderTasks";

import Layout from "./components/Layout";

import "./index.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/tasks/:folderId" element={<FolderTasks />} />
      </Route>
    </Routes>
  );
}

export default App;
