import Chart from "./Chart";
import Filter from "./Filter";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card, Container } from "react-bootstrap";
import { useState } from "react";

const CHART_SUMMARY_DATA = [
  { title: "Total Assigned", value: 4744 },
  { title: "Average Response Time", value: "39:56" },
  { title: "Average First Response Time", value: "49:07" },
  { title: "Resolution within SLA", value: "0%" },
];

const baseColor = "#64154A";

const year =  new Date().getFullYear()

function ChartSection() {
  const [selectedYear, setSelectedYear] = useState(null);

  return (
    <section className="my-4">
      <div className="mb-3">
        <h2 className="fs-6" style={{ color: baseColor, marginBottom: "1rem" }}>
          Chart Overview For {selectedYear || year}
        </h2>
        <Filter selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
      </div>

      <Container className="my-2">
        <Row className="gy-1 gx-4">
          {CHART_SUMMARY_DATA.map(({ title, value }) => (
            <Col key={title} xs={12} sm={6} md={4} lg={3}>
              <Card
                className="shadow-sm border-0"
                style={{ backgroundColor: "#F9F5F7", color: baseColor }}
              >
                <Card.Body>
                  <Card.Title
                    className="fs-5 mb-1"
                    style={{ fontWeight: "600", color: "#9E5779" }}
                  >
                    {title}
                  </Card.Title>
                  <Card.Text className="fs-6 fw-bold mb-0">{value}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <Chart />
    </section>
  );
}

export default ChartSection;
