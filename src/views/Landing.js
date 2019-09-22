import React, { useContext, useState, useEffect } from 'react';
import FirebaseContext from '../utils/firebaseContext';
// drop-in UI component
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


export default function LandingPage(){
  // hooks equivalent to <FirebaseContext.Consumer>
  const { firebase, auth } = useContext(FirebaseContext);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
    const currentUser = firebase.currentUser;
    setLoggedIn(!!currentUser);
  }
  , [firebase]);

  const uiConfig = {
    signInFlow: 'redirect',
    signInSuccessUrl: '/home',
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ]
  };


  return (
    <div>
      <div>
        {!loggedIn &&
          <div>
              <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
          </div>
        }
      </div>
    </div>
  );
}