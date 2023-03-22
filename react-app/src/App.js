import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import SplashPage from "./components/SplashPage"
import Dashboard from "./components/Dashboard/Dashboard";
import AllExpenses from "./components/AllExpenses/AllExpenses";
import FriendPage from "./components/Friends/FriendPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LeftSideNavigation from "./components/Navigation/LeftSideNavigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const location = useLocation()
  const [pathIsSplash, setPathIsSplash] = useState(location.pathname === "/")

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <div style={{display: "flex", justifyContent: "space-between"}}>
          {!pathIsSplash && <LeftSideNavigation />}
          <Switch>
            <Route exact path="/">
              <SplashPage />
            </Route>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/all">
              <AllExpenses />
            </Route>
            <Route exact path="/friends/:friendId">
              <FriendPage />
            </Route>
          </Switch>
        </div>
      )}
    </>
  );
}

export default App;
