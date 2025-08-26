import React from "react";

function TopArrow({prop}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-move-up-icon lucide-move-up"
      {...prop}
    >
      <path d="M8 6L12 2L16 6" />
      <path d="M12 2V22" />
    </svg>
  );
}

export default TopArrow;
