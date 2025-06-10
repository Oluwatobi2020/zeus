import { Form, Button } from "react-bootstrap";

function KeywordsForm({ formik }) {
  const { errors, handleSubmit, values, touched, handleChange } = formik;

  return (
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
      <Form.Group className="mb-3" controlId="keywords">
        <Form.Label>Keywords</Form.Label>
        <Form.Control
          type="text"
          placeholder="Keywords"
          value={values.keywords}
          isInvalid={touched.keywords && !!errors.keywords}
          onChange={handleChange}
        />
        <Form.Control.Feedback type="invalid">
          {errors.keywords}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" className="background-primary-custom">
        Save
      </Button>
    </Form>
  );
}

export default KeywordsForm;
