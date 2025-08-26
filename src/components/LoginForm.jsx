import { useState } from "react";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";

import { useAuth } from "../context/Auth/useAuth";
import { TRANSACTION } from "../data/nav";
import { useAuthMutation } from "../hooks/useAuthMutation";
import { cn } from "../utils/cn";
import Eye from "./icons/Eye";
import EyeSlash from "./icons/EyeSlash";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is Required"),
  password: Yup.string().required("Password is Required"),
});

function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const { signIn } = useAuth();

  const navigate = useNavigate();

  const { mutate: login, isPending: isAuthLoading } = useAuthMutation({
    onSuccess: (data) => {
      signIn(data);

      navigate(`/${TRANSACTION}`);
    },
  });

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        login(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className=" text-sm">
          <div className="mb-6">
            <Field
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              className={cn(
                "w-full p-2 py-3 border border-gray-300 rounded-lg focus:outline-none",
                "dark:border-light-dark dark:text-white",
              )}
              placeholder="Email address"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-xs mt-1 dark:text-white"
            />
          </div>

          <div className="mb-6">
            <div
              className={cn(
                "flex items-center border border-gray-300 rounded-lg pr-2",
                "dark:border-light-dark",
              )}
            >
              <Field
                type={isPasswordVisible ? "password" : "text"}
                name="password"
                id="password"
                autoComplete="off"
                className="flex-grow outline-none bg-transparent pl-2 py-3 rounded-l-lg dark:text-white"
                placeholder="Password "
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
                className="ml-2 focus:outline-none cursor-pointer text-gray-500 dark:text-gray-500"
              >
                {isPasswordVisible ? (
                  <EyeSlash className="w-5 h-5 text-gray-500 dark:text-gray-500" />
                ) : (
                  <Eye className="w-5 h-5 text-gray-500 dark:text-gray-500" />
                )}
              </button>
            </div>
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-xs mt-1 dark:text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full bg-coralpay-primary-purple mt-2 text-white py-3 rounded-lg transition cursor-pointer ",
              { "bg-coralpay-primary-purple/70": isAuthLoading },
            )}
          >
            {isAuthLoading ? <span className="loader" /> : "Login"}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
