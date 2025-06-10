import React from "react";

function SelectedTicketInfo({ selectedTicket }) {
  return (
    <section className="ps-1 border-start">
      <div
        className="p-3"
        style={{
          width: "300px",
          overflowY: "auto",
          backgroundColor: "#F9F5F7",
        }}
      >
        <h6 className="fw-bold mb-3">Ticket Info</h6>
        {selectedTicket ? (
          <>
            <p>
              <strong>Subject:</strong> {selectedTicket.ticketSubject}
            </p>
            <p>
              <strong>Priority:</strong> {selectedTicket.ticketPriority}
            </p>
            <p>
              <strong>Status:</strong> {selectedTicket.ticketStatus}
            </p>
            <p>
              <strong>Due:</strong>{" "}
              {new Date(selectedTicket.ticketDueDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Source:</strong> {selectedTicket.ticketSource}
            </p>
            <p>
              <strong>Agent:</strong> {selectedTicket.agent}
            </p>
            <p>
              <strong>Group:</strong> {selectedTicket.group}
            </p>
            <p>
              <strong>Details: </strong>
              {selectedTicket.ticketDetails}
            </p>
          </>
        ) : (
          <p className="text-muted">Select a ticket to view details.</p>
        )}
      </div>
    </section>
  );
}

export default SelectedTicketInfo;
