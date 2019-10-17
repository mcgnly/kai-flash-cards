import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../utils/firebaseContext';
import Decks from './Decks'
import Landing from './Landing'
import './css/Home.css';

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
        <div className='homeView'>
          <h1>Kai Cards</h1>
          <p>Hello, {user.displayName}</p>
        </div>
        <Decks uid={user.uid} />
      </div>
    );
  }

  return (
    <div>
      {user ?
        dataView():
        <Landing />
      }
    </div>
  );
}