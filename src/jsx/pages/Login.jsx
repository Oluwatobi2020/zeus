import rainbow from "../../images/rainbow.gif";
import LoginForm from "./LoginForm";
import {NavLink} from "react-router-dom"

function Login() {
  return (
    <div className="login-account">
      <div className="row h-100">
        <div className="col-lg-6 align-self-start">
          <div
            className="account-info-area"
            style={{ backgroundImage: `url(${rainbow})` }}
          >
            <div className="login-content">
              <p className="sub-title">Log in with your credentials</p>
              <h1 className="title">
                The Evolution of <span>ZEUS</span>
              </h1>
            </div>
          </div>
        </div>

        <div className="col-lg-6 col-md-7 col-sm-12 mx-auto align-self-center">
          <div className="login-form" style={{ color: "#64154a" }}>
            <div className="login-head">
              <h3 className="title" style={{ color: "#64154a" }}>
                Welcome Back
              </h3>
              <p>
                Enter your login credentials for authentication and access to
                Zeus.
              </p>
            </div>

            <h6 className="login-title">
              <span style={{ color: "#64154a" }}>Login</span>
            </h6>
            <LoginForm />
            <div style={{display:"flex", justifyContent:"center"}}>
              <NavLink to="/">Not a staff? Access ZEUS as a client</NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
