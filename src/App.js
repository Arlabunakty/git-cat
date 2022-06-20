import React from 'react';
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

library.add(fas);

const routes = [
  { path: pathes.repositories, element: <ReposList /> },
  { path: pathes.followers, element: <FollowersList /> },
  { path: pathes.subscriptions, element: <Subscriptions /> },
  { path: pathes.about, element: <About /> },
  { path: "*", element: <NoPage /> },
]

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        {routes.map(route => (<Route key={route.path} path={route.path} element={route.element} />))}
      </Route>
    </Routes>
  );
}

export default App;
