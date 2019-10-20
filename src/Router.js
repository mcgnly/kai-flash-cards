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
      <div>
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.HOME} component={Home} />
    </div>
    </BrowserRouter>
    </div>
  );
}
export default Router;