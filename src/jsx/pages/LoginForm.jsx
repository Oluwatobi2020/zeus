import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../context/AuthContext";
import { Spinner } from "react-bootstrap";
import { useState } from "react";
import Eye from "../components/Icons/IconSvg/Eye.jsx";
import EyeSlash from "../components/Icons/IconSvg/EyeSlash.jsx";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

function LoginForm() {
  const { authenticateUserWithEmailAndPassword, isAuthLoading } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        authenticateUserWithEmailAndPassword(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-4">
            <label className="mb-1 text-dark">Email</label>
            <Field
              type="email"
              name="email"
              className="form-control form-control-lg"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger fs-12"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="mb-1 text-dark">
              Password
            </label>

            <div className="password-wrapper d-flex gap-1 align-items-center px-3 form-control-lg">
              <Field
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                id="password"
                className="flex-grow-1 border-0 bg-transparent p-0  form-control"
                style={{ boxShadow: "none" }}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                style={{
                  background: "transparent",
                  border: "none",
                  padding: "0 0 0 2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isPasswordVisible ? (
                  <Eye style={{ width: "20px", height: "20px" }} />
                ) : (
                  <EyeSlash style={{ width: "20px", height: "20px" }} />
                )}
              </button>
            </div>

            <ErrorMessage
              name="password"
              component="div"
              className="text-danger fs-12 mt-1"
            />
          </div>

          <div className="text-center mb-4">
            <button
              type="submit"
              disabled={isSubmitting || isAuthLoading}
              className="btn background-primary-custom text-white btn-block"
            >
              {isAuthLoading ? <Spinner size="sm" /> : "Login"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
