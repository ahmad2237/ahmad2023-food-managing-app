import React, { useContext } from "react";
import "./style.css";
import { ThemeContext } from "../../App";

function RecipeItem(props) {
  const { id, title, image, addToFavorites } = props;
  const { theme } = useContext(ThemeContext);
  // console.log(props);
  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} alt="recipe item " />
      </div>
      <p
      style={theme ? { color: "#12343b" } : {}}
      >
        {title}
      </p>
      <button
        style={theme ? { backgroundColor: "#12343b" } : {}}
        type="add to favorites"
        onClick={() => addToFavorites(id)}
      >
        Add to favourites
      </button>
    </div>
  );
}

export default RecipeItem;
