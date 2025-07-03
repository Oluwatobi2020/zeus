import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CLIENT_TYPE } from "../jsx/constant/user";

function useStartConversation({
  selectedConversation,
  startConversation,
  startConversationForDocumentation,
}) {
  const { userData } = useAuth();
  const navigate = useNavigate();
  const hasCheckedParams = typeof selectedConversation !== "undefined";

  console.log("IA ")
  useEffect(() => {
    if (!userData && !hasCheckedParams) return;
    console.log("I AM EGER")

    if (selectedConversation) {
      startConversationForDocumentation();
    } else if (userData.type === CLIENT_TYPE) {
      navigate(`/home`);
    } else {
      startConversation();
    }
  }, [
    hasCheckedParams,
    navigate,
    selectedConversation,
    startConversation,
    startConversationForDocumentation,
    userData,
  ]);
}

export default useStartConversation;
