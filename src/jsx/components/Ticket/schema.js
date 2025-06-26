import * as Yup from "yup";

export const ticketSchema = Yup.object().shape({
  clientName: Yup.string()
    .required("Client Name is required")
    .max(100, "Client Name can't exceed 100 characters"),

  ticketSubject: Yup.string()
    .required("Ticket Subject is required")
    .max(150, "Ticket Subject can't exceed 150 characters"),

  ticketType: Yup.string().required("Ticket Type is required"),

  ticketPriority: Yup.string().required("Ticket Priority is required"),

  ticketStatus: Yup.string().required("Ticket Status is required"),

  ticketSource: Yup.string().required("Ticket Source is required"),

  agent: Yup.string(),

  group: Yup.string(),

  businessType: Yup.string(),

  policyType: Yup.string(),

  category: Yup.string(),

  subCategory: Yup.string(),

  ticketDueDate: Yup.date()
    // .required("Ticket Due Date is required")
    .min(new Date(), "Due date cannot be in the past"),

  ticketDetails: Yup.string()
    // .required("Ticket Details are required")
    .min(10, "Ticket Details must be at least 10 characters"),
});

export const initialValues = {
  clientName: "",
  ticketSubject: "",
  ticketType: "",
  ticketPriority: "",
  ticketStatus: "",
  ticketSource: "",
  agent: "",
  group: "",
  businessType: "",
  policyType: "",
  category: "",
  subCategory: "",
  ticketDueDate: "",
  ticketDetails: "",
};

