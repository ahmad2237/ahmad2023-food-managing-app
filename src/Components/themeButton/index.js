import React, { useContext, useState } from "react";
import { ThemeContext } from "../../App";
import AddNewRecipe from "../AddNewRecipe";
import "./style.css";
import CustomModal from "../BasicModal";

function ThemeButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  // console.log(theme, setTheme);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="main">
        <button
          style={theme ? { background: "#12343b" } : {}}
          onClick={() => setTheme(!theme)}
          className="themeButton"
        >
          Change Theme
        </button>

        {/* <button
          className="themeButton"
          style={theme ? { background: "#12343b" } : {}}
        >
          Add New Recipe
        </button> */}

        <button
          className="themeButton"
          style={theme ? { background: "#12343b" } : {}}
          onClick={handleOpen}
        >
          Add New Recipe
        </button>
      </div>
      <CustomModal
        open={isOpen}
        onClose={handleOpen}
        children={<AddNewRecipe />}
        heading={"Add new Recipe"}
      />
    </>
  );
}
export default ThemeButton;
