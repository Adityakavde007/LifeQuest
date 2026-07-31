import React, { useState } from "react";
import Logo from "./Logo";
import NavMenu from "./NavMenu";
import ThemeSwitcher from "./ThemeSwitcher";
import { Menu, X } from "lucide-react";
import "./sidebar.css";

const Sidebar = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="mobile-header">
        <Logo />

        <button
          className="menu-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <Logo />

        <NavMenu isOpen={isOpen} closeMenu={() => setIsOpen(false)} />

        <ThemeSwitcher
          theme={theme}
          setTheme={setTheme}
        />
      </aside>
    </>
  );
};

export default Sidebar;