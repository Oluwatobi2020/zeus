import { createContext, useContext, useState } from "react";

const TicketContext = createContext(undefined);

const sampleTickets = [
  {
    id: "38749",
    clientName: "Emma Johnson",
    ticketSubject: "Policy renewal inquiry",
    ticketType: "Option 1",
    ticketPriority: "High",
    ticketStatus: "Open",
    ticketSource: "Email",
    agent: "Agent A",
    group: "Support",
    businessType: "Insurance",
    policyType: "Life",
    category: "Billing",
    subCategory: "Late Payment",
    ticketDueDate: new Date(Date.now() + 86400000).toISOString().split("T")[0], // 1 day from now
    ticketDetails: "Client requested details on how to renew a lapsed policy.",
    chat: [],
  },
  {
    id: "387465",
    clientName: "Tolu Adewale",
    ticketSubject: "Change of address request",
    ticketType: "Option 2",
    ticketPriority: "Medium",
    ticketStatus: "In Progress",
    ticketSource: "Phone",
    agent: "Agent B",
    group: "Sales",
    businessType: "Finance",
    policyType: "Health",
    category: "Claims",
    subCategory: "Policy Update",
    ticketDueDate: new Date(Date.now() + 2 * 86400000)
      .toISOString()
      .split("T")[0], // 2 days from now
    ticketDetails:
      "User wants to update their residential address for records.",
    chat: [],
  },
  {
    id: "38743349",
    clientName: "Yusuf Bello",
    ticketSubject: "Delayed claim approval",
    ticketType: "Option 1",
    ticketPriority: "High",
    ticketStatus: "Open",
    ticketSource: "Web",
    agent: "Agent A",
    group: "Support",
    businessType: "Insurance",
    policyType: "Health",
    category: "Claims",
    subCategory: "Late Payment",
    ticketDueDate: new Date(Date.now() + 3 * 86400000)
      .toISOString()
      .split("T")[0],
    ticketDetails:
      "Client is following up on a claim that hasn't been approved.",
    chat: [],
  },
  {
    id: "383456749",
    clientName: "Chinwe Obi",
    ticketSubject: "Quote for new insurance policy",
    ticketType: "Option 2",
    ticketPriority: "Low",
    ticketStatus: "Closed",
    ticketSource: "Email",
    agent: "Agent B",
    group: "Sales",
    businessType: "Insurance",
    policyType: "Life",
    category: "Billing",
    subCategory: "Policy Update",
    ticketDueDate: new Date(Date.now() + 5 * 86400000)
      .toISOString()
      .split("T")[0],
    ticketDetails:
      "Client is requesting a quote for a new life insurance policy.",
    chat: [],
  },
  {
    id: "387494894",
    clientName: "Toheeb Adisa",
    ticketSubject: "Dispute on billing charges",
    ticketType: "Option 1",
    ticketPriority: "High",
    ticketStatus: "Open",
    ticketSource: "Phone",
    agent: "Agent A",
    group: "Support",
    businessType: "Finance",
    policyType: "Health",
    category: "Billing",
    subCategory: "Late Payment",
    ticketDueDate: new Date(Date.now() + 4 * 86400000)
      .toISOString()
      .split("T")[0],
    ticketDetails:
      "Customer claims to have been wrongly billed for last month's service.",
    chat: [],
  },
];

export const TicketProvider = ({ children }) => {
  const [listOfTickets, setListOfTickets] = useState(sampleTickets);

  const addTicket = (ticket) => {
    setListOfTickets((prev) => [
      ...prev,
      { ...ticket, id: `${387494894 + listOfTickets.length}`, chat: [] },
    ]);
  };

  const addChatMessage = (ticketId, message) => {
    setListOfTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, chat: [...ticket.chat, message] }
          : ticket
      )
    );
  };

  return (
    <TicketContext.Provider
      value={{ listOfTickets, addTicket, addChatMessage }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = () => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error("useTicket must be used within a TicketProvider");
  }
  return context;
};
