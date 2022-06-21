import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Main from './components/Main';
import ReposList from './components/ReposList';
import FollowersList from './components/FollowersList';
import Subscriptions from './components/Subscriptions';
import About from './components/About';
import NoPage from './components/NoPage';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { pathes } from './Routes'
import * as userService from './services/GitHubUserService'

library.add(fas);

const routes = [
  { path: pathes.repositories, element: <ReposList /> },
  { path: pathes.followers, element: <FollowersList /> },
  { path: pathes.subscriptions, element: <Subscriptions /> },
  { path: pathes.about, element: <About /> },
  { path: "*", element: <NoPage /> },
]

function App() {
  const [data, setData] = useState({user: {}, isFetching: true});

  useEffect(() => {
    const init = async () => {
      try {
        setData({ user:{}, isFetching: true });
        const user = await userService.fetchUser();
        setData({ user: user, isFetching: false });
      } catch (e) {
        console.log(e);
        setData({ user: {}, isFetching: false });
      }
    };
    init();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Main user={data.user} isFetching={data.isFetching}/>}>
        {routes.map(route => (<Route key={route.path} path={route.path} element={route.element} />))}
      </Route>
    </Routes>
  );
}

export default App;
