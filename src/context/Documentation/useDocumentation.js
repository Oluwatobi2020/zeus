import { useContext } from "react";

import DocumentationContext from "./context";

export const useDocumentation = () => {
  const context = useContext(DocumentationContext);
  if (context === undefined) {
    throw new Error("useDocumentation must be used within the DocumentationProvider");
  }
  return context;
};
