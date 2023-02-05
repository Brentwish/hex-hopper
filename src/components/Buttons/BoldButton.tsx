import React, { useMemo } from "react";

type ButtonProps = {
  label: string;
  color: 'green';
  onClick: () => void;
};

const BoldButton = ({ label, color, onClick }: ButtonProps) => {
  const colorClasses = useMemo(() => {
    if (color === 'green') return 'bg-green-500 hover:bg-green-400 border-green-700 hover:border-green-500';
    return '';
  }, [color])

  return (
    <button
      type="button"
      className={`text-white font-bold py-2 px-4 m-5 border-b-4 rounded ${colorClasses}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default BoldButton;
