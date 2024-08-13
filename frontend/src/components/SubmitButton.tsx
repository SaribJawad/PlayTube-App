import React from "react";

interface SubmitButtonProps {
  label: string;
  onClick?: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, onClick }) => {
  return (
    <button
      className="button-animation px-8 py-[10px] mt-10   bg-red-800"
      type="submit"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
