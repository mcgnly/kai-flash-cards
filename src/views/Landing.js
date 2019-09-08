import React, { useContext, useState, useEffect } from 'react';
import { FirebaseContext } from '../utils/firebaseContext';
// drop-in UI component
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

export default function LandingPage(){
  // hooks equivalent to <FirebaseContext.Consumer>
  const firebase = useContext(FirebaseContext);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
    const currentUser = firebase.auth().currentUser;
    setLoggedIn(!!currentUser);
  }
  , [firebase]);

  const uiConfig = {
    signInFlow: 'redirect',
    // Redirect to /home after sign in is successful.
    signInSuccessUrl: '/home',
    // display Google and email as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ]
  };


  return (
    <div>
      <h3>Landing Page</h3>
      <div>
        {loggedIn ?
          <p>you are signed in</p> :
          <div>
            <p>
                something something
            </p>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
          </div>
        }
      </div>
    </div>
  );
}