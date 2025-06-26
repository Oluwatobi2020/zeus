import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";

export const tabs = [
  { key: "ticket-type-priority", label: "Ticket Type and Priority" },
  { key: "ticket-type-keywords", label: "Ticket Type and Keywords" },
];

const baseColor = "#64154A";

function TabNav() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get("tab") || tabs[0].key;

  return (
    <Nav
      className="flex-column sidebar-nav"
      style={{
        minWidth: "220px",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        padding: "1rem",
      }}
    >
      {tabs.map(({ key, label }) => {
        const isActive = currentTab === key;
        return (
          <Nav.Item key={key} className="mb-2">
            <NavLink
              to={`${location.pathname}?tab=${key}`}
              className="nav-link"
              style={{
                fontWeight: isActive ? "bold" : "normal",
                color: isActive ? "#fff" : baseColor,
                backgroundColor: isActive ? baseColor : "transparent",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                textDecoration: "none",
                transition: "all 0.2s ease-in-out",
              }}
            >
              {label}
            </NavLink>
          </Nav.Item>
        );
      })}
    </Nav>
  );
}

export default TabNav;
