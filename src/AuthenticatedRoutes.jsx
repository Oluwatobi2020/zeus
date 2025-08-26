import { Navigate, Route, Routes } from "react-router";

import ChatLayout from "./components/ChatLayout";
import { DocumentationProvider } from "./context/Documentation/Provider";
import { MenuProvider } from "./context/Menu/MenuProvider";
import { TransactionProvider } from "./context/Transaction/Provider";
import { DOCUMENTATION, TRANSACTION } from "./data/nav";
import Documentation from "./page/Documentation";
import NotFound from "./page/NotFound";
import Transaction from "./page/Transaction";

export default function AuthenticatedRoutes({ user }) {
  const isStaff = user.type === "STAFF";
  return (
    <DocumentationProvider>
      <TransactionProvider>
        <MenuProvider>
          <Routes>
            <Route element={<ChatLayout />}>
              <Route
                path="/"
                element={<Navigate to={isStaff ? `/${TRANSACTION}` : `/${DOCUMENTATION}`} />}
              />
              <Route
                path={`/${TRANSACTION}`}
                element={isStaff ? <Transaction /> : <Navigate to={`/${DOCUMENTATION}`} />}
              />
              <Route path={`/${DOCUMENTATION}`} element={<Documentation />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MenuProvider>
      </TransactionProvider>
    </DocumentationProvider>
  );
}
