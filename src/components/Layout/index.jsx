import { Outlet } from "react-router-dom";

import SideBar from "../Sidebar";

const Layout = () => {
  return (
    <div className="todo">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Layout;
