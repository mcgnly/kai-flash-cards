import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';

import Home from './views/Home';
import Landing from './views/Landing';
import CardContainer from './views/CardContainer';
import Decks from './views/Decks';
// import SingleDeck from './views/SingleDeck';

const ROUTES={
  LANDING: '/',
  HOME: '/home',
  DECKS: '/decks',
  CARD: '/card',
}; 

function Router() {
  return (
    <div className="App">
    <BrowserRouter>
      <Switch>
        <Route exact path={ROUTES.LANDING} component={Landing} />
        <Route path={ROUTES.HOME} component={Home} />
        <Route path={ROUTES.DECKS} component={Decks} />
        {/* <Route path={ROUTES.SINGLE_DECK} component={SingleDeck} /> */}
        <Route path={ROUTES.CARD} component={CardContainer} />
      </Switch>
    </BrowserRouter>
    </div>
  );
}
export default Router;