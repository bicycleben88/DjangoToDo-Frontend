import React from "react";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Todo from "./components/ToDo";

export const GlobalContext = React.createContext(null);

function App() {
  const [globalState, setGlobalState] = React.useState({
    url: process.env.REACT_APP_API_BASE_URL,
    token: "",
    id: "",
  });

  return (
    <div className="App">
      <GlobalContext.Provider value={{ globalState, setGlobalState }}>
        <SignUp />
        <LogIn />
        {globalState.token ? <Todo /> : <h2>Please log in</h2>}
      </GlobalContext.Provider>
    </div>
  );
}

export default App;
