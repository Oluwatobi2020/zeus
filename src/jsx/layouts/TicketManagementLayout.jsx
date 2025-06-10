import { Outlet } from "react-router-dom";

import Header from "./nav/Header";
import { TicketProvider } from "../../context/TicketContext";

function TicketManagementLayout() {
  return (
    <TicketProvider>
      <Header />

      <div className="content-body" style={{ width: "100%", marginLeft: 0 }}>
        <div
          className="container-fluid"
          style={{ minHeight: window.screen.height - 45 }}
        >
          <Outlet />
        </div>
      </div>
    </TicketProvider>
  );
}

export default TicketManagementLayout;
