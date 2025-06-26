import React from "react";
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { Button } from "react-bootstrap";
import { useAuth } from "../../../context/AuthContext";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

function LogoutPage() {
  const { signOut } = useAuth();

  return (
    <>
      <button
        className="dropdown-item ai-icon d-flex align-items-center"
        onClick={signOut}
      >
        <svg
          id="icon-logout"
          xmlns="http://www.w3.org/2000/svg"
          className="text-danger"
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1={21} y1={12} x2={9} y2={12} />
        </svg>
        <p className="mb-0">
          {/* <i className="fas fa-cog text-primary-custom me-2" /> */}
          <span style={{ marginLeft: "0.5rem" }}>Logout</span>
        </p>
      </button>
    </>
  );
}

export default LogoutPage;
