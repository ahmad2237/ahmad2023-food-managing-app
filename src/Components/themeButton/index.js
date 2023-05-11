import React, { useContext } from "react";
import { ThemeContext } from "../../App";
import "./style.css";

function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  console.log(theme, setTheme);

  return (
    <div className="main">
      <button
        style={theme ? { background: "#12343b" } : {}}
        onClick={() => setTheme(!theme)}
        className="themeButton"
      >
        Change Theme
      </button>
    </div>
  );
}
export default ThemeButton;
