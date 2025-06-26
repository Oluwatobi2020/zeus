import { useLocation, useNavigate, useParams } from "react-router-dom";

import { SVGICON } from "../../constant/theme";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }

  return ComponentWithRouterProp;
}

function LogoutMini() {
  function onLogout() {}
  return (
    <>
      <button className="logout-btn mini-btn" onClick={onLogout}>
        {SVGICON.LogoutIocn}
      </button>
    </>
  );
}

export default withRouter(LogoutMini);
