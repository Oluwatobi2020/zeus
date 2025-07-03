import { Suspense, useEffect, useState } from "react";

import User from "./jsx/components/Home/User";
import Login from "./jsx/pages/Login";

import Index from "./jsx";

import { Routes, Route } from "react-router-dom";

import "./css/style.css";
import { useAuth } from "./context/AuthContext";
import Error404 from "./jsx/pages/Error404";
import { ChatProvider } from "./context/ChatContext";

import { DocumentProvider } from "./context/DocumentContext";
import SplashScreen from "./jsx/pages/SplashScreen";

function App() {
  const { userData } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 10000); // 30 seconds

      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  if (userData) {
    return (
      <>
        <DocumentProvider>
          <ChatProvider>
            <Suspense
              fallback={
                <div id="preloader">
                  <div className="sk-three-bounce">
                    <div className="sk-child sk-bounce1"></div>
                    <div className="sk-child sk-bounce2"></div>
                    <div className="sk-child sk-bounce3"></div>
                  </div>
                </div>
              }
            >
              <Index />
            </Suspense>
          </ChatProvider>
        </DocumentProvider>
      </>
    );
  } else {
    return (
      <Suspense
        fallback={
          <div id="preloader">
            <div className="sk-three-bounce">
              <div className="sk-child sk-bounce1"></div>
              <div className="sk-child sk-bounce2"></div>
              <div className="sk-child sk-bounce3"></div>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="" element={showSplash ? <SplashScreen /> : <User />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: isAuthenticated(state),
//   };
// };

export default App;
// export default withRouter(connect(mapStateToProps)(App));
