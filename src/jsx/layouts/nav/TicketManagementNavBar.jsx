import { NavLink } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";

const navLinks = [
  {
    url: "/ticket-management",
    text: "Dashboard",
  },
  {
    url: "/ticket-management/tickets",
    text: "All Tickets",
  },
  {
    url: "/ticket-management/agents",
    text: "Agents",
  },
];

const primaryColor = "#64154A";

function TicketManagementNavBar() {
  return (
    <NavDropdown
      title={<span style={{ color: primaryColor }}>Ticket Management</span>}
      id="ticket-management-dropdown"
    >
      {navLinks.map(({ url, text }) => (
        <NavDropdown.Item key={text}>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? primaryColor : "#333",
              // fontWeight: isActive ? "600" : "400",
              // padding: "6px 12px",
            })}
            className={({ isActive }) =>
              `nav-link ${
                isActive ? "fw-bold text-primary-custom" : "text-dark-custom"
              }`
            }
            to={url}
            end
          >
            {text}
          </NavLink>
        </NavDropdown.Item>
      ))}
    </NavDropdown>
  );
}

export default TicketManagementNavBar;
