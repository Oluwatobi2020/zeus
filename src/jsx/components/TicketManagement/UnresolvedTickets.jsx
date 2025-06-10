import Card from "react-bootstrap/Card";

const GROUP_UNRESOLVED_TICKETS = [
  { group: "Issac", numTickets: 1 },
  { group: "Tolu", numTickets: 0 },
  { group: "Yusuf", numTickets: 13 },
  { group: "Toheeb", numTickets: 0 },
  { group: "Tunde", numTickets: 10 },
];

const baseColor = "#64154A";

function UnresolvedTickets() {
  return (
    <Card
      className="shadow-sm border-0"
      style={{ color: baseColor, backgroundColor: "#F9F5F7" }}
    >
      <Card.Body>
        <Card.Title
          className="mb-3"
          style={{ fontSize: "15px", fontWeight: "600", color: baseColor }}
        >
          Unresolved Tickets By Agent
        </Card.Title>
        <Card.Text
          className="fw-bold mb-0"
          style={{
            height: "250px",
            overflowY: "auto",
            fontSize: "13px",
          }}
        >
          {GROUP_UNRESOLVED_TICKETS.map(({ group, numTickets }) => (
            <div
              key={group}
              className="d-flex align-items-center justify-content-between mb-2"
              style={{
                fontSize: "14px",
                padding: "6px 0",
              }}
            >
              <p className="mb-0">{group}</p>
              <p className="mb-0">{numTickets}</p>
            </div>
          ))}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default UnresolvedTickets;
