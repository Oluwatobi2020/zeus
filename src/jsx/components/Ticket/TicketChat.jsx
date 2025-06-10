import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTicket } from "../../../context/TicketContext";
import SelectedTicketInfo from "./SelectedTicketInfo";
import ListOfTicketsInChat from "./ListOfTicketsInChat";
import Messages from "./Messages";
import ChatInput from "./ChatInput";

function TicketChat() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const { listOfTickets } = useTicket();

  const userTickets = useMemo(
    () => listOfTickets.filter((ticket) => ticket.id === ticketId),
    [ticketId, listOfTickets]
  );

  const [selectedTicket, setSelectedTicket] = useState(userTickets[0] || null);

  useEffect(() => {
    const foundTicket = listOfTickets.find((ticket) => ticket.id === ticketId);

    if (!foundTicket) {
      navigate("/ticket-management/tickets");
    } else {
      setSelectedTicket(foundTicket);
    }
  }, [ticketId, listOfTickets, navigate]);

  const messages = selectedTicket?.chat || [];

  return (
    <section
      className="d-flex"
      style={{ height: "85vh", marginTop: "-1.4rem" }}
    >
      <ListOfTicketsInChat
        messages={messages}
        userTickets={listOfTickets}
        setSelectedTicket={setSelectedTicket}
        selectedTicket={selectedTicket}
      />

      <div className="flex-grow-1 d-flex flex-column" style={{ width: "100%" }}>
        <div className="mb-2 ps-2 border-bottom pb-2">
          <h5 className="mb-0">
            {selectedTicket?.clientName || "No ticket selected"}
          </h5>
          {selectedTicket?.ticketSubject && (
            <small>{selectedTicket?.ticketSubject}</small>
          )}
        </div>

        <Messages messages={messages} />

        <ChatInput ticketId={selectedTicket.id} />
      </div>

      <SelectedTicketInfo selectedTicket={selectedTicket} />
    </section>
  );
}

export default TicketChat;
