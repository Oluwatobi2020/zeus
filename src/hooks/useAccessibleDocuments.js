import { useSearchParams } from "react-router";

import { useAuth } from "../context/Auth/useAuth";
import { DOCUMENTATION_SEARCH_PARAM_KEY } from "../data/nav";
import { useDocumentAccessQuery } from "./useDocumentAccess";

export function useAccessibleDocuments() {
  const { user } = useAuth();

  const { data: accessibleDocs } = useDocumentAccessQuery(user.id);

  const [searchParams] = useSearchParams();

  const urlDoc = searchParams.get(DOCUMENTATION_SEARCH_PARAM_KEY) || "";

  const firstDocKey = accessibleDocs?.documents?.[0]?.value;

  const selectedDocument = accessibleDocs?.documents.find((docs) => docs.value === urlDoc);

  return {
    firstDocKey,
    accessibleDocs: accessibleDocs?.documents,
    urlDoc,
    selectedDocument,
  };
}
