import React, { useState } from "react";
import axios from "axios";
// import BasicModal from "../BasicModal";
// import { Button, TextField } from "@mui/material";
import "./style.css";

export default function AddNewRecipe() {
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(null);
  // const [formData, setFormData] = useState("");

  function handleInputChange(event) {
    const value = event.target.value;
    setInputValue(value);

    if (value.length < 5) {
      setInputError("Input must be at least 5 characters");
    } else {
      setInputError(null);
    }
  }

  const handleSubmit = (event) => {
    alert(`you input value is ${inputValue}`);
    // event.preventDefault();
  };

  return (
    <form onSubmit={() => handleSubmit()} className="form">
      <label>
        Recipe Name :{" "}
        <input
          className="textField"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
        />
      </label>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  );
}
