import { useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";

import { useAuth } from "../context/Auth/useAuth";
import { DOCUMENTATION } from "../data/nav";
import { useDocumentAccessMutation } from "../hooks/useDocumentAccess";
import { cn } from "../utils/cn";
import Eye from "./icons/Eye";
import EyeSlash from "./icons/EyeSlash";

const validationSchema = Yup.object({
  accessKey: Yup.string().required("Access key is Required"),
});

function ClientLoginForm() {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const { mutate, isPending } = useDocumentAccessMutation({
    onSuccess: (data) => {
      signIn({
        ...data,
        type: "CLIENT",
        id: data.username,
      });

      navigate(DOCUMENTATION);
    },
  });

  const [isAccessKeyVisible, setIsAccessKeyVisible] = useState(true);

  return (
    <Formik
      initialValues={{ accessKey: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        mutate(values.accessKey);
      }}
    >
      {() => (
        <Form className=" text-sm">
          <div className="mb-6">
            <div className="flex items-center border border-gray-300 rounded-lg pr-2 dark:border-light-dark">
              <Field
                type={isAccessKeyVisible ? "password" : "text"}
                name="accessKey"
                id="accesskey"
                autoComplete="off"
                className="flex-grow outline-none bg-transparent pl-2 py-3"
                placeholder="Access Key "
              />
              <button
                type="button"
                onClick={() => setIsAccessKeyVisible((prev) => !prev)}
                className="ml-2 focus:outline-none  cursor-pointer"
              >
                {isAccessKeyVisible ? (
                  <EyeSlash className="w-5 h-5 text-gray-500" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-500" />
                )}
              </button>
            </div>
            <ErrorMessage name="accessKey" component="p" className="text-red-500 text-xs mt-1" />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={cn(
              "w-full bg-coralpay-primary-purple mt-2 text-white py-3 rounded-lg transition cursor-pointer",
              { "bg-coralpay-primary-purple/70": isPending },
            )}
          >
            {isPending ? <span className="loader" /> : "Login"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default ClientLoginForm;
