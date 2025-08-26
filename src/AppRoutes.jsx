import { Navigate, Route, Routes } from "react-router";

import AuthenticatedRoutes from "./AuthenticatedRoutes";
import { useAuth } from "./context/Auth/useAuth";
import { DOCUMENTATION, TRANSACTION } from "./data/nav";
import Login from "./page/Login";
import NotFound from "./page/NotFound";

function AppRoutes() {
  const { user } = useAuth();

  return user ? (
    <AuthenticatedRoutes user={user} />
  ) : (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path={`/${TRANSACTION}`} element={<Login />} />
      <Route path={`/${DOCUMENTATION}`} element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
