import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './Router';
import * as serviceWorker from './utils/serviceWorker';
import FirebaseContext, { app, auth, db, firebase } from './utils/firebaseContext';

ReactDOM.render(
    <FirebaseContext.Provider value={{app, auth, db, firebase}}>
        <Router />
    </FirebaseContext.Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// injectKaiosNavigation();
