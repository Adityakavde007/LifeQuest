import React from "react";

const ThemeSwitcher = ({ theme, setTheme }) => {
  return (
    <div className="theme-switcher">
      <p className="theme-title">Theme</p>

      <div className="theme-options">
        <button className={`theme-button purple-button ${theme === "purple" ? "selected-theme" : ""}`} onClick={() => setTheme("purple")}></button>
        <button className={`theme-button blue-button ${theme === "blue" ? "selected-theme" : ""}`} onClick={() => setTheme("blue")}></button>
        <button className={`theme-button green-button ${theme === "green" ? "selected-theme" : ""}`} onClick={() => setTheme("green")}></button>
        <button className={`theme-button orange-button ${theme === "orange" ? "selected-theme" : ""}`} onClick={() => setTheme("orange")}></button>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
