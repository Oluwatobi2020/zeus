import { Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const schema = Yup.object().shape({
  ticketType: Yup.string().required("Ticket Type is required"),
  priority: Yup.string()
    .oneOf(["HIGH", "MEDIUM", "LOW"], "Select a valid priority")
    .required("Priority is required"),
});

function PriorityForm({ setListOfPriority, listOfPriority }) {
  const initialValues = { ticketType: "", priority: "" };

  const handleSubmit = (values, { resetForm }) => {
    setListOfPriority((prev) => [
      ...prev,
      { ...values, id: listOfPriority.length },
    ]);
    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, errors, touched }) => (
        <Form noValidate className="w-50 mt-4" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="ticketType">
            <Form.Label>Ticket Type</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ticket Type"
              value={values.ticketType}
              isInvalid={touched.ticketType && !!errors.ticketType}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.ticketType}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="priority">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              aria-label="Priority"
              value={values.priority}
              isInvalid={touched.priority && !!errors.priority}
              onChange={handleChange}
              name="priority"
            >
              <option value="">Set Ticket Priority</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              {errors.priority}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className="background-primary-custom">
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default PriorityForm;
