import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useFormik } from "formik";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const baseColor = "#64154A"; // Your purple

const borderStyle = {
  border: `1px solid ${baseColor}`,
  borderRadius: "0.375rem",
  backgroundColor: "transparent",
  color: baseColor,
};

const dropdownToggleStyle = {
  color: baseColor,
};

function Filter({ selectedYear, setSelectedYear }) {
  const [selectedDay, setSelectedDay] = useState("Day");
  const [selectedMonth, setSelectedMonth] = useState("Month");

  const resetFilters = () => {
    setSelectedDay("Day");
    setSelectedMonth("Month");
    setSelectedYear(null);
  };

  const formik = useFormik({
    initialValues: {
      startDate: "",
      endDate: "",
    },
  });

  return (
    <div className="p-3 mb-4 ml-auto d-flex justify-content-end">
      <Row className="g-2 align-items-center">
        {/* <Col xs={12} md="auto">
          <p
            className="p-2 px-3 rounded-pill mb-0 text-center"
            style={{ backgroundColor: baseColor, color: "#fff" }}
          >
            Filter By Range
          </p>
        </Col> */}

        <Col xs={6} sm={4} md="auto" style={{marginTop:"-1.2rem"}}>
          {/* <DropdownButton
            id="dropdown-day"
            title={selectedDay}
            onSelect={(eventKey) => setSelectedDay(eventKey)}
            className="w-100"
            style={borderStyle}
            variant=""
            toggleStyle={dropdownToggleStyle}
          >
            {[...Array(31)].map((_, i) => {
              const day = i + 1;
              return (
                <Dropdown.Item
                  key={day}
                  eventKey={day}
                  style={{ color: baseColor }}
                  active={selectedDay === day.toString()}
                >
                  {day}
                </Dropdown.Item>
              );
            })}
          </DropdownButton> */}
          {/* <label>Start Date</label><br/> */}
          {/* <input name="startDate" style={{paddin}}   /> */}
          <Form noValidate>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Start Date"
              value={formik.values.startDate}
              // isInvalid={touched.clientName && !!errors.clientName}
              onChange={formik.handleChange}
            />
          </Form>
        </Col>

        <Col xs={6} sm={4} md="auto" style={{marginTop:"-1.2rem"}}>
          <Form noValidate>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="End Date"
              value={formik.values.endDate}
              // isInvalid={touched.clientName && !!errors.clientName}
              onChange={formik.handleChange}
            />
          </Form>
        </Col>

        {/* <Col xs={6} sm={4} md="auto">
          <DropdownButton
            id="dropdown-year"
            title={selectedYear || "Year"}
            onSelect={(eventKey) => setSelectedYear(eventKey)}
            className="w-100"
            style={borderStyle}
            variant=""
          >
            {[...Array(10)].map((_, i) => {
              const year = 2025 - i;
              return (
                <Dropdown.Item
                  key={year}
                  eventKey={year}
                  style={{ color: baseColor }}
                  active={selectedYear === year.toString()}
                >
                  {year}
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </Col> */}

        <Col xs={6} sm={4} md="auto">
          <Button
            variant="primary"
            className="w-100"
            style={{ backgroundColor: baseColor, borderColor: baseColor }}
          >
            Submit
          </Button>
        </Col>

        <Col xs={6} sm={4} md="auto">
          <Button
            variant="outline-primary"
            className="w-100"
            onClick={resetFilters}
            style={{ color: baseColor, borderColor: baseColor }}
          >
            Reset
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Filter;
