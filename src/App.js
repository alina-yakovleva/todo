import { Routes, Route } from "react-router-dom";
import CurrentTasks from "./components/CurrentTasks";

import Layout from "./components/Layout";

import "./index.scss";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/tasks/:folderId" element={<CurrentTasks />} />
      </Route>
    </Routes>
  );
}

export default App;
