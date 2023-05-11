import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { ThemeContext } from "../../App";

function Search(props) {
  //   console.log(props);
  //   console.log("porps", props);
  const { theme } = useContext(ThemeContext);
  const { getDataFromSearchComponent, apiCalledSuccess, setApiCalledSuccess } =
    props;
  const [inputValue, setInputValue] = useState("");
  const handleChangeInput = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    getDataFromSearchComponent(inputValue);
  };
  useEffect(() => {
    if (apiCalledSuccess) {
      setInputValue("");
      setApiCalledSuccess(false);
    }
  }, [apiCalledSuccess, setApiCalledSuccess]);

  //   console.log(inputValue);

  return (
    <div>
      <form className="search">
        <input
          type="search"
          name="search"
          value={inputValue}
          onChange={handleChangeInput}
          placeholder="Search recipes"
        />
        <button
          style={theme ? { color: "#12343b" } : {}}
          onClick={handleSubmit}
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default Search;
