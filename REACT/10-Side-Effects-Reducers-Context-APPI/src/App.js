/*import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./components/store/auth-context";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //console.log("loop")

  //this function don't run directly in the component function
  // this functions is executed after every component re-evaluation
  // this effect only ran once, when the component rendered for the first time
  useEffect(() => {
    //console.log("useEfect-1")
    const storeUserLoggedInInformation = localStorage.getItem("isLoggedIn");
    if (storeUserLoggedInInformation === "1") {
      //console.log("useEfect-2")

      setIsLoggedIn(true);
    }
  }, []); //if doesn't have [] this code reruns whenever the component was reredered and if we have state in here  this would trigger a rerender cycle itself hence we would have an infinite loop

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler
      }}
    >
      <MainHeader/>
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App; */

// class 125

import React, {useContext}  from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./components/store/auth-context";

function App() {
  const ctx = useContext(AuthContext)
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login  />}
        {ctx.isLoggedIn && <Home  />}
      </main>
    </React.Fragment>
  );
}

export default App;
