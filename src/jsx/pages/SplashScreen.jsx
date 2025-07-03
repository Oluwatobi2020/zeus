import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import SplashLottie from "../../path/to/splash-screen.lottie";
import { Stack } from "react-bootstrap";
import CoralpayLogo from "../../images/coralpay-logo.png";

const SplashScreen = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ width: "100%", background: "#fff" }}
    >
      <div
        style={{ width: "100%", height: "100vh" }}
        className="d-flex justify-content-center align-items-center"
      >
        <Stack
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={CoralpayLogo} width={70} height={70} />
          <DotLottieReact
            src={SplashLottie}
            loop
            autoplay
            style={{ width: "350px", height: "200px" }}
          />
          <p
            style={{
              fontSize: "1em",
              textAlign: "center",
              fontWeight: 550,
            }}
          >
            Welcome to the world of{" "}
            <span style={{ color: "#590742", fontSize: "1.3em" }}>ZEUS</span>
          </p>
        </Stack>
      </div>
    </div>
  );
};

export default SplashScreen;
