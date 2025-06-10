import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const TICKETS_SUMMARY = [
  { status: "Pending", count: 945 },
  { status: "Unresolved", count: 233 },
  { status: "Overdue", count: 233 },
  { status: "Open", count: 1092 },
  { status: "On Hold", count: 27 },
  { status: "Unassigned", count: 139 },
  { status: "Internal Response", count: 6 },
  { status: "Closed", count: 3791 },
];

const baseColor = "#64154A"; 

function Summary() {
  return (
    <Container className="my-2">
      <h3
        className="fw-semibold fs-4"
        style={{ color: baseColor, marginBottom: "1rem" }}
      >
        Ticket Summary
      </h3>
      <Row className="gy-3 gx-4">
        {TICKETS_SUMMARY.map(({ status, count }) => (
          <Col key={status} xs={12} sm={6} md={4} lg={3}>
            <Card
              className="shadow-sm border-0"
              style={{ backgroundColor: "#F9F5F7", color: baseColor }}
            >
              <Card.Body>
                <Card.Title
                  className="fs-5 mb-1"
                  style={{ fontWeight: "600", color: "#9E5779" }}
                >
                  {status}
                </Card.Title>
                <Card.Text
                  className="fs-6 fw-bold mb-0"
                  style={{ fontSize: "1.25rem" }}
                >
                  {count.toLocaleString()}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Summary;
