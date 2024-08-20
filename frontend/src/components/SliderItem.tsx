import React from "react";
import { Link } from "react-router-dom";

interface SliderItemProps {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const SliderItem: React.FC<SliderItemProps> = ({ to, label, icon }) => {
  return (
    <li className="border p-2 border-zinc-800 hover:border-zinc-600 ">
      <Link to={to} className="flex items-center gap-2">
        {icon}
        <span className="text-md">{label}</span>
      </Link>
    </li>
  );
};

export default SliderItem;
