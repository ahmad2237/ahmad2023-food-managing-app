import React, { createContext, useState } from "react";
import HomePage from "./Pages/HomePage";
import ThemeButton from "./Components/themeButton";

//there are three steps of useContext
// create the Context
// provide the context
// consume the context

// create the context
export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(false);
  return (
    // provide the context
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <div className="app" style={theme ? { backgroundColor: "#feb300" } : {}}>
        <ThemeButton />
        <HomePage />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
