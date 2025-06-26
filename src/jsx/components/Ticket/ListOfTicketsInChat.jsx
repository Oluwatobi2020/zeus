import { useNavigate } from "react-router-dom";

function ListOfTicketsInChat({ userTickets, selectedTicket, messages }) {
  const lastMessage = messages[messages.length - 1]?.text || "";

  const navigate = useNavigate();

  return (
    <div
      className=" border-end"
      style={{
        width: "270px",
        overflowY: "auto",
      }}
    >
      <h6
        className="fw-bold mb-3"
        style={{
          color: "#64154A",
          fontSize: "16px",
          textTransform: "uppercase",
        }}
      >
        Tickets
      </h6>

      {userTickets.map((ticket) => {
        const isActive = selectedTicket?.ticketSubject === ticket.ticketSubject;

        return (
          <button
            key={ticket.id}
            className={`btn d-flex align-items-center p-2 rounded mb-2 border-none`}
            style={{
              color: isActive ? "#64154A" : "black",
              backgroundColor: isActive ? "#f0f0f0" : "",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate(`/ticket-management/tickets/${ticket.id}`);
            }}
          >
            <img
              src="/User.jpg"
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-circle me-2"
            />
            <div>
              <p className="fw-semibold mb-0" style={{ fontSize: "14px" }}>
                {ticket.clientName}
              </p>
              <small className={"text-light text-start"}>
                {lastMessage?.split(" ").slice(0, 4).join(" ") +
                  (lastMessage.split(" ").length > 4 ? "..." : "") ||
                  "No messages yet"}
              </small>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default ListOfTicketsInChat;
