import React, { useState, useMemo } from "react";

export const UiTriggersContext = React.createContext({});

export const UiTriggersProvider = ({ children }) => {
  const [showLoader, setShowLoader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [openNewMsg, setOpenNewMsg] = useState(false);


  const toggleLoader = useMemo(
    () => () => setShowLoader(!showLoader),
    [showLoader]
  );
  const toggleOpenNewMsg = useMemo(
    () => () => setOpenNewMsg(!openNewMsg),
    [openNewMsg]
  );

  const hideLoader = useMemo(() => () => setShowLoader(false), []);
  const displayLoader = useMemo(() => () => setShowLoader(true), []);

  const resetChat = useMemo(() => () => setOpenNewMsg(false), []);
  const startNewChat = useMemo(() => () => setOpenNewMsg(true), []);

  const hideModal = useMemo(() => () => setShowModal(false), []);
  const displayModal = useMemo(() => () => setShowModal(true), []);

  console.log("openNewMsg", openNewMsg)

  const uiTriggersValue = useMemo(() => {
    return {
      showLoader,
      showModal,
      toggleLoader,
      displayLoader,
      hideLoader,
      hideModal,
      displayModal,
      resetChat,
      startNewChat,
      toggleOpenNewMsg,
      openNewMsg,
    };
  }, [
    showLoader,
    showModal,
    toggleLoader,
    displayLoader,
    hideLoader,
    hideModal,
    displayModal,
    resetChat,
    startNewChat,
    toggleOpenNewMsg,
    openNewMsg,
  ]);

  return (
    <UiTriggersContext.Provider value={uiTriggersValue}>
      {children}
    </UiTriggersContext.Provider>
  );
};
