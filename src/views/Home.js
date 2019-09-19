import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../utils/firebaseContext';
import Decks from './Decks'

export default function HomePage(){
  const { auth, db } = useContext(FirebaseContext);
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');

  useEffect(()=>{
    // use this watcher here so that it finishes initializing before updating
    auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        setUser(user);
        user.getIdToken().then(
          (idToken)=> {
            setToken(idToken)
          }
        ).catch((err)=> console.log(err));
      }
    });
  }
  , [auth, db, token, user]);


  function dataView() {
    return (
      <div>
        <p>Hello, {user.displayName},</p>
        <Decks uid={user.uid} />
      </div>
    );
  }

  return (
    <div>
    <h3>Home Page</h3>
    <div>
      {user ?
        dataView():
        <p>go to landing to sign in</p>
        // TODO push to landing route
      }
    </div>
  </div>
  );
}