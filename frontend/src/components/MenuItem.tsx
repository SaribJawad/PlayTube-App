import React from "react";
import { Link } from "react-router-dom";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, to }) => {
  return (
    <li className="border p-2 border-zinc-800 hover:border-zinc-600 ">
      <Link to={to} className="flex items-center gap-2">
        {icon}
        <span className="text-md hidden lg:block">{label}</span>
      </Link>
    </li>
  );
};

export default MenuItem;
