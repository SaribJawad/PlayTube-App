import React from "react";
import { Link } from "react-router-dom";

interface FooterItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const FooterItem: React.FC<FooterItemProps> = ({ icon, label, to }) => {
  return (
    <li className="  w-14 pt-1">
      <Link to={to} className="flex flex-col py-2 items-center">
        {icon}
        <span className="text-[12px]">{label}</span>
      </Link>
    </li>
  );
};

export default FooterItem;
