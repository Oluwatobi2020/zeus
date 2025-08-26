import { useEffect } from "react";

import { useNavigate } from "react-router";

import { DOCUMENTATION, DOCUMENTATION_SEARCH_PARAM_KEY } from "../data/nav";

export function useDocumentationReroute({ urlDoc, firstDocKey }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!urlDoc && firstDocKey) {
      navigate(`/${DOCUMENTATION}?${DOCUMENTATION_SEARCH_PARAM_KEY}=${firstDocKey}`, {
        replace: true,
      });
    }
  }, [urlDoc, firstDocKey, navigate]);
}
