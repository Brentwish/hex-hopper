import React from "react";

type ButtonProps = {
  label: string;
  color: string;
  onClick: () => void;
};

const BoldButton = ({ label, color, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className={`bg-${color}-500 hover:bg-${color}-400 text-white font-bold py-2 px-4 m-5 border-b-4 border-${color}-700 hover:border-${color}-500 rounded`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default BoldButton;
