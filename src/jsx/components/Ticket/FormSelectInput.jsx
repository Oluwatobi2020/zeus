import { Form } from "react-bootstrap";

function FormSelectInput({
  handleChange,
  error,
  touched,
  value,
  name,
  labelName,
  required,
  options,
}) {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>
        {labelName} {required && <span className="text-danger">*</span>}
      </Form.Label>
      <Form.Select
        value={value}
        isInvalid={touched && !!error}
        onChange={handleChange}
      >
        <option value="">Select {labelName}</option>
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
}

export default FormSelectInput;
