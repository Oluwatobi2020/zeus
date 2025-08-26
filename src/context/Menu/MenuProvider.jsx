import { useState } from "react";
import MenuContext from "./context";

export function MenuProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <MenuContext.Provider
      value={{ isMenuOpen, openMenu, closeMenu, toggleMenu }}
    >
      {children}
    </MenuContext.Provider>
  );
}
