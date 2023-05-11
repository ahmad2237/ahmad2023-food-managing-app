import React, {
  useCallback,
  useEffect,
  useReducer,
  useState,
  useContext,
  useMemo,
} from "react";
import Search from "../../Components/Search";
import "./style.css";
import RecipeItem from "../../Components/RecipeItem";
import FavoriteItem from "../../Components/FavoriteItem";
import { ThemeContext } from "../../App";

function HomePage() {
  let dummyData = "dummydata";
  const reducer = (state, action) => {
    switch (action.type) {
      case "filterFavorites":
        return {
          ...state,
          fileteredValue: action.value,
        };

      default:
        return;
    }
  };
  const initialState = {
    fileteredValue: "",
  };

  const [loadingState, setLoadingState] = useState(false);

  const [recipes, setRecipes] = useState([]);

  const [favorite, setFavorite] = useState([]);

  // console.log("favorite", favorite);

  //state for api is successfull or not

  const [apiCalledSuccess, setApiCalledSuccess] = useState(false);

  // use reducer functionality

  const [filteredState, dispatch] = useReducer(reducer, initialState);

  const { theme } = useContext(ThemeContext);

  const getDataFromSearchComponent = (getData) => {
    // console.log(getData);

    // keep the loading state as true before we are calling the api

    setLoadingState(true);

    // calling the api
    async function getRecipes() {
      const apiResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=2653e9275cc848949c4e129623416ba8&query=${getData}`
      );
      const result = await apiResponse.json();
      const { results } = result;
      if (results && results.length > 0) {
        setLoadingState(false);
        setRecipes(results);
        setApiCalledSuccess(true);
      }
    }
    getRecipes();
  };

  const addToFavorites = useCallback(
    (getCurrentRecipeItem) => {
      let copyFavorite = [...favorite];

      const index = copyFavorite.findIndex(
        (item) => item === getCurrentRecipeItem
      );
      // console.log("item.id", item.id);
      // console.log("getCurrentRecipeItem.id", getCurrentRecipeItem.id);

      if (index === -1) {
        copyFavorite.push(getCurrentRecipeItem);
        setFavorite(copyFavorite);
        localStorage.setItem("favorite", JSON.stringify(copyFavorite));
        window.scrollTo({ top: "0", behavior: "smooth" });
      } else {
        alert("Item is already Present in favorites");
      }
    },
    [favorite]
  );

  // const addToFavorites = (getCurrentRecipeItem) => {
  //   let copyFavorite = [...favorite];
  //   const index = copyFavorite.findIndex(
  //     (item) => item.id === getCurrentRecipeItem.id
  //   );

  //   if (index === -1) {
  //     copyFavorite.push(getCurrentRecipeItem);
  //     setFavorite(copyFavorite);
  //     localStorage.setItem("favorite", JSON.stringify(copyFavorite));
  //   } else {
  //     alert("Item is already Present in favorites");
  //   }
  // };
  const RemoveFavorites = (getCurrentId) => {
    let copyFavorite = [...favorite];
    copyFavorite = copyFavorite.filter((item) => item.id !== getCurrentId);
    setFavorite(copyFavorite);
    localStorage.setItem("favorite", JSON.stringify(copyFavorite));
  };
  useEffect(() => {
    const extractFavoritesfromLocalStorageOnPageLoad = JSON.parse(
      localStorage.getItem("favorite")
    );
    setFavorite(extractFavoritesfromLocalStorageOnPageLoad);
  }, []);

  const filteredFavoritesItem = () => {
    favorite.filter((item) =>
      item.title.toLowerCase().includes(filteredState.fileteredValue)
    );
  };

  const RenderRecipes = useCallback(() => {
    if (recipes && recipes.length > 0) {
      recipes.map((item) => (
        <RecipeItem
          addToFavorites={() => addToFavorites(item)}
          id={item.id}
          image={item.image}
          title={item.title}
        />
      ));
    }
  }, [recipes, addToFavorites]);

  return (
    <div className="homePage-main">
      <Search
        getDataFromSearchComponent={getDataFromSearchComponent}
        dummyData={dummyData}
        apiCalledSuccess={apiCalledSuccess}
        setApiCalledSuccess={setApiCalledSuccess}
      />
      <div className="favorites-wrapper">
        <h1
          style={theme ? { color: "#12343b" } : {}}
          className="favorites-title"
        >
          Favorites
        </h1>
        <div className="search-favorites">
          <input
            name="searchFavorites"
            placeholder="Search favorites"
            onChange={(event) => {
              dispatch({ type: "filterFavorites", value: event.target.value });
            }}
            value={filteredState.filteredValue}
          />
        </div>

        <div className="favorites">
          {!filteredFavoritesItem && (
            <div
              className="noItems"
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100% ",
              }}
            >
              No favorites are found
            </div>
          )}
          {filteredFavoritesItem && filteredFavoritesItem.length > 0
            ? filteredFavoritesItem.map((item) => (
                <FavoriteItem
                  RemoveFavorites={() => RemoveFavorites(item)}
                  id={item.id}
                  image={item.image}
                  title={item.title}
                />
              ))
            : null}
        </div>
      </div>
      {loadingState && (
        <div className="loading">Loading Recipes ! Please wait</div>
      )}
      {/* map through all the recipe items */}
      <div className="items">
        {/* {RenderRecipes()} */}

        {useMemo(() =>
            !loadingState && recipes && recipes.length > 0
              ? recipes.map((item) => (
                  <div>
                    <RecipeItem
                      addToFavorites={() => addToFavorites(item)}
                      id={item.id}
                      image={item.image}
                      title={item.title}
                    />
                  </div>
                ))
              : null,
          [loadingState, recipes, addToFavorites]
        )}
      </div>

      {/* map through all the recipes */}
      {!loadingState && !recipes.length && (
        <div className="noItems">No recipes are found</div>
      )}
    </div>
  );
}

export default HomePage;
