import { useState } from "react";

import ClientLoginForm from "../components/ClientLoginForm";
import LoginForm from "../components/LoginForm";
import logo from "/src/assets/zeus-logo.png";

function Login() {
  const [isClient, setIsClient] = useState(false);

  return (
    <main className="dark:bg-dark h-screen pt-16 px-4 dark:text-white">
      <img src={logo} alt="Zeus" className="w-20 mx-auto rounded-full" />
      <div className="w-full max-w-lg mx-auto  p-8 ">
        <div className="mb-6 text-center">
          <h3 className="text-4xl font-medium ">Sign in</h3>
          <p className=" mt-2">Enter your credentials to access Zeus.</p>
        </div>

        {isClient ? <ClientLoginForm /> : <LoginForm />}

        <p className="text-center text-sm text-gray-600 dark:text-white mt-4">
          Not a {!isClient ? "staff" : "client"}? Access ZEUS as a{" "}
          <button
            className="text-coralpay-primary-purple cursor-pointer hover:underline dark:text-white dark:underline "
            onClick={() => {
              setIsClient((prev) => !prev);
            }}
          >
            {isClient ? "staff" : "client"}
          </button>
        </p>
      </div>
    </main>
  );
}

export default Login;
