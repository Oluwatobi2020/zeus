import { UiTriggersContext } from "../context/UiTriggersContext";
import { useContext } from "react";

export const useLoader = () => {
  const {
    displayLoader,
    hideLoader,
    toggleLoader,
    showLoader,
    resetChat,
    startNewChat,
    toggleOpenNewMsg,
    openNewMsg
  } = useContext(UiTriggersContext);
  return {
    displayLoader,
    hideLoader,
    toggleLoader,
    showLoader,
    resetChat,
    startNewChat,
    toggleOpenNewMsg,
    openNewMsg
  };
};
