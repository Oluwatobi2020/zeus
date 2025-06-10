import { Button } from "react-bootstrap";
import {
  createSearchParams,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AddTicketModal from "./AddTicketModal";

import { useTicket } from "../../../context/TicketContext";

const modalName = "add-ticket";

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function Ticket() {
  const { listOfTickets } = useTicket();
  const navigate = useNavigate();
  const { search, pathname } = useLocation();
  const searchParams = new URLSearchParams(search);
  const modal = searchParams.get("modal");

  const handleClick = () => {
    navigate({
      pathname,
      search: `?${createSearchParams({ modal: modalName })}`,
    });
  };

  const handleHideModal = () => {
    navigate(pathname);
  };

  return (
    <main>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <p>Total: {listOfTickets.length}</p>
        <Button onClick={handleClick} className="background-primary-custom">
          Add Ticket
        </Button>
      </div>

      {modal === modalName && <AddTicketModal onHideModal={handleHideModal} />}

      <section className="mt-3">
        {listOfTickets.map((ticket) => (
          <NavLink
            to={pathname + "/" + ticket.id}
            className="d-flex justify-content-between align-items-center border-bottom py-2"
          >
            <div className="d-flex align-items-center gap-2">
              <input
                type="checkbox"
                style={{
                  accentColor: "#64154A",
                }}
              />

              <p className="mb-0">
                {ticket.clientName} Ticket - Due on{" "}
                {formatDate(ticket.ticketDueDate)}
              </p>
            </div>

            <p
              className={`mb-0 ${
                ticket.ticketPriority === "High"
                  ? "text-danger"
                  : "text-primary"
              }`}
            >
              {ticket.ticketPriority}
            </p>
          </NavLink>
        ))}
      </section>
    </main>
  );
}

export default Ticket;
