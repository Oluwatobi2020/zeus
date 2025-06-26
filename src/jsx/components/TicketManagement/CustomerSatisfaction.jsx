import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const data = [
  {
    emoji: "😁",
    value: "Great 74",
  },
  {
    emoji: "☺️",
    value: "Good 53",
  },
  {
    emoji: "🙂",
    value: "Okay 40",
  },
  {
    emoji: "😑",
    value: "Not okay 16",
  },
  {
    emoji: "😡",
    value: "Terrible 21",
  },
];

function CustomerSatisfaction() {
  const firstRows = data.slice(0, 3);
  const lastRow = data.slice(3);
  return (
    <Card
      className="shadow-sm border-0"
      style={{ backgroundColor: "#F9F5F7", color: "#64154A" }}
    >
      <Card.Body>
        <Card.Title className=" mb-3 text-black" style={{ fontSize: "15px" }}>
          Customer Satisfaction
        </Card.Title>
        <Card.Text
          className="overflow-y-scroll"
          style={{ fontSize: "12px", height: "250px" }}
        >
          <Row>
            {firstRows.map(({ emoji, value }) => (
              <Col
                key={emoji}
                xs={4}
                className="text-center mb-3 overflow-y-scroll"
              >
                <p className="mb-1 fs-1">{emoji}</p>
                <p className="mb-0">{value}</p>
              </Col>
            ))}
          </Row>

          <Row className="justify-content-center">
            {lastRow.map(({ emoji, value }) => (
              <Col key={emoji} xs={4} className="text-center mb-3">
                <p className="mb-1 fs-1">{emoji}</p>
                <p className="mb-0">{value}</p>
              </Col>
            ))}
          </Row>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CustomerSatisfaction;
