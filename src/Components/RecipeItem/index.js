import React, { useContext } from "react";
import "./style.css";
import { ThemeContext } from "../../App";

function RecipeItem(props) {
  const { id, title, image, addToFavorites, handleDelete } = props;
  const { theme } = useContext(ThemeContext);
  // console.log(props)

  return (
    <div key={id} className="recipe-item">
      <div>
        <img src={image} alt="recipe item " />
      </div>
      <p style={theme ? { color: "#12343b" } : {}}>{title}</p>
      <div className="buttonGroup">
        <button
          style={theme ? { backgroundColor: "#12343b" } : {}}
          type="add to favorites"
          onClick={() => addToFavorites(id)}
        >
          Add to favourites
        </button>
        <button
          style={theme ? { backgroundColor: "#12343b" } : {}}
          type="Delete Recipe"
          onClick={handleDelete}
        >
          Delete Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeItem;
