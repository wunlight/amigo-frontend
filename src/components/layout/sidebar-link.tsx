import { NavLink } from "react-router";
import { Button } from "../ui/button";

type SidebarLinkProps = {
  to: string;
  icon: string;
  label: string;
};

function SidebarLink({ to, icon, label }: SidebarLinkProps) {
  return (
    <NavLink to={to} className="w-full">
      {({ isActive }) => (
        <Button
          variant={isActive ? "default" : "ghost"}
          className="justify-start w-full"
        >
          <span className={`${icon} text-lg`} />
          <span>{label}</span>
        </Button>
      )}
    </NavLink>
  );
}

export default SidebarLink;
