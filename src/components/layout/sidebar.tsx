import SidebarLink from "./sidebar-link";

function Sidebar() {
  return (
    <div className="size-full bg-zinc-50">
      <div className="flex flex-col gap-1.5 p-3">
        <SidebarLink
          to="/cashier"
          icon="icon-[hugeicons--cashier]"
          label="Cashier"
        />
        <SidebarLink
          to="/purchases"
          icon="icon-[hugeicons--package-receive]"
          label="Purchases"
        />
        <SidebarLink
          to="/products"
          icon="icon-[hugeicons--package]"
          label="Products"
        />
        <SidebarLink
          to="/categories"
          icon="icon-[hugeicons--folder-01]"
          label="Categories"
        />
      </div>
    </div>
  );
}

export default Sidebar;
