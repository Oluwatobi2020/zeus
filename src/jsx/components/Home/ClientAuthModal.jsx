import { Formik } from "formik";
import { Modal, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { Form, Field, ErrorMessage } from "formik";
import { useDocument } from "../../../context/DocumentContext";
import { CLIENT_TYPE } from "../../constant/user";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const validationSchema = Yup.object({
  accessKey: Yup.string().required("Access Key is Required"),
});

function ClientAuthModal({ show, onClose }) {
  const { getDocumentAccess, isDocumentLoading } = useDocument();
  const { updateUserData } = useAuth();

  const navigate = useNavigate();
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Client Auth</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ accessKey: "" }}
          validationSchema={validationSchema}
          onSubmit={async function (values, { setSubmitting }) {
            const isAuthenticated = await getDocumentAccess(values.accessKey);

            if (isAuthenticated) {
              navigate("/home");
              updateUserData({ id: values.accessKey, type: CLIENT_TYPE });
            }
            setSubmitting(false);
          }}
        >
          {() => (
            <Form>
              <label className="mb-1 text-dark">Provide access key</label>
              <Field
                type="accessKey"
                name="accessKey"
                className="form-control"
              />
              <ErrorMessage
                name="accessKey"
                component="div"
                className="text-danger fs-12"
              />
              <Button className="custom-button mt-3" type="submit">
                {isDocumentLoading ? <Spinner size="sm" /> : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}

export default ClientAuthModal;
