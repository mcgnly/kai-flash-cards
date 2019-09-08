import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../utils/firebaseContext';
import Flashcards from './Flashcards'
// import axios from 'axios';

export default function HomePage(){
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  // const [data, setData] = useState({});

  useEffect(()=>{
    // use this watcher here so that it finishes initializing before updating
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        setUser(user.displayName);
        user.getIdToken().then(
          (idToken)=> {
            // firebase returns the token as a result of this call, which we pass in the header to our API
            setToken(idToken)
          }
        ).catch((err)=> console.log(err));

      //   async function fetchData(){
      //   const result = await axios(
      //     'http://localhost:3333/secretpath/',
      //     {
      //       headers: {
      //         Authorization: `Bearer ${token}`
      //       }
      //     }
      //   );
      //   setData(result.data);
      // }
      // if (token) {
      //   fetchData();
      // }
      // } else {
      //   // No user is signed in.
      //   console.log('no user')
      }
    });
  }
  , [firebase, token, user]);

  function dataView() {
    return (
      <div>
        <p>Hello, {user},</p>
        <Flashcards />
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
      }
    </div>
  </div>
  );
}