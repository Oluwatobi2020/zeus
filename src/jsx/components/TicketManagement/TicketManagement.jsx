import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Summary from "./Summary";
import ChartSection from "./ChartSection";
import UnresolvedTickets from "./UnresolvedTickets";
import CustomerSatisfaction from "./CustomerSatisfaction";
import PieChartSection from "./PieChart";

const TicketManagement = () => {
  return (
    <div style={{ padding: "2rem", }}>
      <ChartSection />
      <Summary />

      <Container className="my-4">
        <Row className="g-4">
          <Col xs={12} md={6} lg={4}>
            <UnresolvedTickets />
          </Col>
          <Col xs={12} md={6} lg={4}>
            <CustomerSatisfaction />
          </Col>
          <Col xs={12} md={6} lg={4}>
            <PieChartSection />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TicketManagement;
