import React from "react";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";

export const GlobalContext = React.createContext(null);

function App() {
  const [globalState, setGlobalState] = React.useState({
    url: process.env.REACT_APP_API_BASE_URL,
    token: "",
  });

  return (
    <div className="App">
      <GlobalContext.Provider value={{ globalState, setGlobalState }}>
        <SignUp />
        <LogIn />
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
