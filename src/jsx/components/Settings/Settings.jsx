import { useLocation } from "react-router-dom";
import TabNav from "./TabNav";
import { tabs } from "./TabNav";
import Priority from "./Priority";
import Keywords from "./Keywords";
import Header from "../../layouts/nav/Header";
import { Row, Col } from "react-bootstrap";

function Settings() {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get("tab") || tabs[0].key;

  return (
    <>
      <Header />
      <main
        style={{
          marginTop: "7rem",
        }}
      >
        <h1 className="fs-5 text-primary-custom ms-3">Ticket Type Settings</h1>
        <Row>
          <Col sm={3}>
            <TabNav />
          </Col>
          <Col>
            {currentTab === tabs[0].key && <Priority />}
            {currentTab === tabs[1].key && <Keywords />}
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Settings;
