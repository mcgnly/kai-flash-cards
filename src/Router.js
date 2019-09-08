import React from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

import Home from './views/Home';
import Landing from './views/Landing';

const ROUTES={
  LANDING: '/',
  HOME: '/home',
}; 

function Router() {
  return (
    <div className="App">
    <BrowserRouter>
      <ul>
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
      </ul>
      <div>
        <hr />
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.HOME} component={Home} />
    </div>
    </BrowserRouter>
    </div>
  );
}
export default Router;