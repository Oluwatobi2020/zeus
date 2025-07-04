import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CLIENT_TYPE, STAFF_TYPE } from "../jsx/constant/user";
import { useConversationType } from "../hooks/useConversationType";
import { useDocument } from "../context/DocumentContext";

function useStartConversation({
  selectedChannel,
  startConversation,
  startConversationForDocumentation,
}) {
  const { userData } = useAuth();
  const navigate = useNavigate();

  const conversationType = useConversationType();
  const { documents } = useDocument();

  useEffect(() => {
    if (!userData || documents.length === 0) return;

    const isStaff = userData.type === STAFF_TYPE;
    const isClient = userData.type === CLIENT_TYPE;
    const hasConversationType = conversationType !== null;

    if (isStaff) {
      if (!hasConversationType) {
        startConversation();
      } else if (hasConversationType && selectedChannel) {
        startConversationForDocumentation();
      } else if (hasConversationType && !selectedChannel) {
        navigate("/home");
      }
    } else if (isClient) {
      if (hasConversationType && selectedChannel) {
        startConversationForDocumentation();
      } else {
        navigate("/home");
      }
    }
  }, [
    userData,
    conversationType,
    selectedChannel,
    documents,
    navigate,
    startConversation,
    startConversationForDocumentation,
  ]);
}

export default useStartConversation;
