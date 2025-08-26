import { FileText, WalletCards } from "lucide-react";
import { NavLink } from "react-router";

import { useAuth } from "../context/Auth/useAuth";
import { useMenu } from "../context/Menu/useMenu";
import { DOCUMENTATION, TRANSACTION } from "../data/nav";
import { cn } from "../utils/cn";
import UserDropdown from "./UserDropdown";
import logo from "/src/assets/zeus-logo.png";

const staffLinks = [
  { title: "Transaction", slug: `/${TRANSACTION}`, icon: <WalletCards /> },
  { title: "Documentation", slug: `/${DOCUMENTATION}`, icon: <FileText /> },
];

const clientLinks = [{ title: "Documentation", slug: `/${DOCUMENTATION}`, icon: <FileText /> }];

function SideBar() {
  const { closeMenu, isMenuOpen } = useMenu();
  const {
    user: { type },
  } = useAuth();

  const selectedLink = type === "STAFF" ? staffLinks : clientLinks;

  return (
    <>
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={closeMenu} />
      )}

      <nav
        className={cn(
          "z-50 h-screen flex flex-col border-r border-gray-300 bg-white w-80 md:max-w-[18rem] transition-transform duration-300 ease-in-out dark:bg-dark dark:border-light-dark",
          "md:static md:translate-x-0",
          isMenuOpen ? "fixed left-0 top-0 translate-x-0" : "fixed -translate-x-full",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-gray-200 dark:border-light-dark px-2 py-[0.36rem] flex items-center gap-2">
          <img src={logo} alt="Coralpay" className="w-12 rounded-full" />
          <h1 className={cn("text-2xl font-semibold", "dark:text-white")}>ZEUS</h1>
        </div>

        <ul className="px-2 mt-5 flex-1 space-y-4 overflow-y-auto">
          {selectedLink.map((link) => (
            <li key={link.slug}>
              <NavLink
                to={link.slug}
                onClick={closeMenu}
                className={({ isActive }) =>
                  cn(
                    "cursor-pointer flex items-center gap-1 px-3 py-3.5 rounded font-semibold text-sm w-full hover:bg-coralpay-primary-purple/30 hover:text-coralpay-primary-purple",
                    isActive
                      ? "text-coralpay-primary-purple bg-[#e499be7a] dark:bg-white/20"
                      : "text-black/80 ",
                    "dark:text-white dark:hover:bg-white/30 dark:hover:text-white",
                  )
                }
              >
                {link.icon}
                <p>{link.title}</p>
              </NavLink>
            </li>
          ))}
        </ul>

        <UserDropdown />
      </nav>
    </>
  );
}

export default SideBar;
