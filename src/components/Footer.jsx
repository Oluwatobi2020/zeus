import React from "react";

import { cn } from "../utils/cn";

const date = new Date();
const currentYear = date.currentYear;

function Footer() {
  return (
    <p className={cn("text-xs text-center mt-1 mb-2", "dark:text-white")}>
      Copyright © Designed &amp; Developed by{" "}
      <a
        href="https://www.coralpay.com/"
        target="_blank"
        rel="noreferrer"
        className={cn(
          "text-coralpay-primary-purple cursor-pointer hover:underline",
          "dark:underline dark:text-white",
        )}
      >
        CoralPay
      </a>{" "}
      {currentYear}
    </p>
  );
}

export default Footer;
