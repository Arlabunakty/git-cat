import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './components/Main';
import ReposList from './components/ReposList';
import FollowersList from './components/FollowersList';
import Subscriptions from './components/Subscriptions';
import About from './components/About';
import NoPage from './components/NoPage';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<ReposList />} />
          <Route path="followers" element={<FollowersList />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
