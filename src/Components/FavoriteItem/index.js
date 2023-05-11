import React from "react";
import "./style.css";

function FavoriteItem(props) {
  const { id, title, image, RemoveFavorites } = props;
  console.log(props);
  return (
    <div className="favorite-item">
      <div key={id}>
        <img src={image} alt="favorite item image" />
      </div>
      <p>{title}</p>
      <button type="add to favorites" onClick={RemoveFavorites}>
        Remove from favourites
      </button>
    </div>
  );
}

export default FavoriteItem;
