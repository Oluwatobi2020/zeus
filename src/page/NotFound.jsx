import { Link } from "react-router";

import { cn } from "../utils/cn";

function NotFound() {
  return (
    <div
      className={cn(
        "min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6",
        "dark:bg-dark",
      )}
    >
      <div className="text-center">
        <h1 className="text-9xl font-bold text-coralpay-primary-purple">404</h1>
        <h2
          className={cn("mt-4 text-2xl md:text-3xl font-semibold text-gray-800", "dark:text-white")}
        >
          Page not found
        </h2>
        <p className={cn("mt-2 text-gray-600", "text-white/60")}>
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-block px-6 py-3 text-white bg-coralpay-primary-purple rounded-md transition"
          >
            Go back home
          </Link>
        </div>
      </div>

      <div className="mt-10">
        <svg
          className="w-64 h-64 mx-auto text-coralpay-primary-purple/20 dark:text-coralpay-primary-purple/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 20.5v-1.75m0-5.25v.008v-.008zm0-3.25h.008v.008H12v-.008zm0-3.25h.008v.008H12V8.75zm0-3.25h.008v.008H12V5.5z"
          />
        </svg>
      </div>
    </div>
  );
}

export default NotFound;
