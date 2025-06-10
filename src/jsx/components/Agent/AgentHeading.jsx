import { Button, DropdownButton, Dropdown, Form } from "react-bootstrap";

import { useState } from "react";

const borderStyle = {
  border: "1px solid #6c757d",
  borderRadius: "0.375rem",
  backgroundColor: "transparent",
  color: "#212529",
};

function AgentHeading() {
  const [pagination, setPagination] = useState(10);

  return (
    <section
      className="d-flex justify-content-between align-items-end mb-10"
      style={{ marginBottom: "20px" }}
    >
      <DropdownButton
        id="dropdown-pagination"
        title={`${pagination}`}
        onSelect={(eventKey) => setPagination(Number(eventKey))}
        variant=""
        className="w-auto"
        style={borderStyle}
        size="sm"
      >
        {[10, 20, 30, 40, 50].map((number) => (
          <Dropdown.Item key={number} eventKey={number}>
            {number}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <div className="d-flex flex-column align-items-end gap-2">
        <Button variant="outline-primary" size="sm" className="py-1 px-3">
          Export
        </Button>

        <Form.Control
          type="text"
          placeholder="Search"
          className="border-secondary py-1"
          // style={{ paddingTop: "0.25rem", paddingBottom: "0.25rem" }}
        />
      </div>
    </section>
  );
}

export default AgentHeading;
