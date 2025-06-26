import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import FormSelectInput from "./FormSelectInput";
import { useFormik } from "formik";
import { ticketSchema, initialValues } from "./schema";
import { useTicket } from "../../../context/TicketContext";
import { CloseButton } from "react-bootstrap";

function AddTicketModal({ onHideModal }) {
  const { addTicket } = useTicket();

  const formik = useFormik({
    initialValues,
    validationSchema: ticketSchema,
    onSubmit: (values, { resetForm }) => {
      addTicket(values);
      resetForm();
      onHideModal();
    },
  });

  const { handleSubmit, errors, touched, values, handleChange } = formik;

  return (
    <section
      style={{
        position: "absolute",
        top: "6rem",
        backgroundColor: "white",
        width: "96%",
      }}
    >
      <div className="d-flex justify-content-between align-items-center ">
        <h3>Add Ticket</h3>
        <CloseButton onClick={onHideModal} />
      </div>

      <>
        <p className="text-danger">All fields with (*) are required</p>

        <Form noValidate className="mt-4" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="clientName">
            <Form.Label>
              Client Name <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Client Name"
              value={values.clientName}
              isInvalid={touched.clientName && !!errors.clientName}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.clientName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="ticketSubject">
            <Form.Label>
              Ticket Subject <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Ticket Subject"
              value={values.ticketSubject}
              isInvalid={touched.ticketSubject && !!errors.ticketSubject}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.ticketSubject}
            </Form.Control.Feedback>
          </Form.Group>

          <FormSelectInput
            value={values.ticketType}
            labelName="Ticket Type"
            handleChange={handleChange}
            error={errors.ticketType}
            touched={touched.ticketType}
            name="ticketType"
            required
            options={["Option 1", "Option 2"]}
          />

          <FormSelectInput
            value={values.ticketPriority}
            labelName="Ticket Priority"
            handleChange={handleChange}
            error={errors.ticketPriority}
            touched={touched.ticketPriority}
            name="ticketPriority"
            required
            options={["High", "Medium", "Low"]}
          />

          <FormSelectInput
            value={values.ticketStatus}
            labelName="Ticket Status"
            handleChange={handleChange}
            error={errors.ticketStatus}
            touched={touched.ticketStatus}
            name="ticketStatus"
            required
            options={["Open", "In Progress", "Closed"]}
          />

          <FormSelectInput
            value={values.ticketSource}
            labelName="Ticket Source"
            handleChange={handleChange}
            error={errors.ticketSource}
            touched={touched.ticketSource}
            name="ticketSource"
            required
            options={["Email", "Phone", "Web"]}
          />

          <FormSelectInput
            value={values.agent}
            labelName="Agent"
            handleChange={handleChange}
            error={errors.agent}
            touched={touched.agent}
            name="agent"
            options={["Agent A", "Agent B"]}
          />

          <FormSelectInput
            value={values.group}
            labelName="Group"
            handleChange={handleChange}
            error={errors.group}
            touched={touched.group}
            name="group"
            options={["Support", "Sales"]}
          />

          <FormSelectInput
            value={values.businessType}
            labelName="Business Type"
            handleChange={handleChange}
            error={errors.businessType}
            touched={touched.businessType}
            name="businessType"
            options={["Insurance", "Finance"]}
          />

          <FormSelectInput
            value={values.policyType}
            labelName="Policy Type"
            handleChange={handleChange}
            error={errors.policyType}
            touched={touched.policyType}
            name="policyType"
            options={["Life", "Health"]}
          />

          <FormSelectInput
            value={values.category}
            labelName="Category"
            handleChange={handleChange}
            error={errors.category}
            touched={touched.category}
            name="category"
            options={["Billing", "Claims"]}
          />

          <FormSelectInput
            value={values.subCategory}
            labelName="Subcategory"
            handleChange={handleChange}
            error={errors.subCategory}
            touched={touched.subCategory}
            name="subCategory"
            options={["Late Payment", "Policy Update"]}
          />

          <Form.Group className="mb-3" controlId="ticketDueDate">
            <Form.Label>Ticket Due Date</Form.Label>
            <Form.Control
              type="date"
              value={values.ticketDueDate}
              isInvalid={touched.ticketDueDate && !!errors.ticketDueDate}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.ticketDueDate}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="ticketDetails">
            <Form.Label>Ticket Details</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              value={values.ticketDetails}
              isInvalid={touched.ticketDetails && !!errors.ticketDetails}
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              {errors.ticketDetails}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="background-primary-custom">
            Save
          </Button>
        </Form>
      </>
    </section>
  );
}

export default AddTicketModal;
