import SideBar from "./SideBar";
import { Outlet } from "react-router";

function ChatLayout() {
  return (
    <div className="flex dark:bg-dark">
      <SideBar />
      <Outlet />
    </div>
  );
}

export default ChatLayout;
