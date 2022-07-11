import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main/Main";
import ReposList from "./components/ReposList/ReposList";
import FollowersList from "./components/FollowersList/FollowersList";
import Subscriptions from "./components/Subscriptions/Subscriptions";
import About from "./components/About/About";
import NoPage from "./components/NoPage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { pathes } from "./Routes";
import UserContext from "./contexts/UserContext";

library.add(fas);

function App() {
  const routes = [
    {
      path: pathes.repositories,
      element: <ReposList />,
    },
    { path: pathes.followers, element: <FollowersList /> },
    { path: pathes.subscriptions, element: <Subscriptions /> },
    { path: pathes.about, element: <About /> },
    { path: "*", element: <NoPage /> },
  ];

  return (
    <UserContext.UserProvider>
      <Routes>
        <Route path="/" element={<Main />}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </UserContext.UserProvider>
  );
}

export default App;
