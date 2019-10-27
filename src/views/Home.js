import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../utils/firebaseContext';
import Decks from './Decks'
import SingleDeck from './SingleDeck'
import CardContainer from './CardContainer'
import NewCard from './NewCard'
import Landing from './Landing'
import './css/Home.css';

// uid
// decks: {
    // german:{
    //     1:{q: , a: , ...},
    //     2:{q: , a: , ...},
    //      },
    // french:{
    //     1:{q: , a: , ...},
    //     2:{q: , a: , ...},
    // }
// }

const pages = {
  welcome:'welcome',
  decks:'decks',
  card:'card',
  newCard:'newCard',
  singleDeck:'singleDeck',
}

export default function HomePage(){
  const { auth, db } = useContext(FirebaseContext);
  const [user, setUser] = useState('');
  const [token, setToken] = useState('');
  const [currentDeckName, setCurrentDeckName] = useState('french');
  // const [currentDeckName, setCurrentDeckName] = useState('');
  const [allDecks, setAllDecks] = useState({});
  const [decksRef, setDecksRef] = useState({});
  const [currentPg, setcurrentPg] = useState(pages.singleDeck);
  // const [currentPg, setcurrentPg] = useState(pages.decks);

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
      // get the ref for other components to use
      const documentReference = db.collection('users').doc(user.uid);
      setDecksRef(documentReference);
      // get all the decks
      documentReference.get()
      .then(doc => {
        if (doc.exists){
          const allDecksFromData = doc.data();
          console.log('doc info', allDecksFromData)
          setAllDecks(allDecksFromData);
        }
      });
    }
  })
}
  , [auth, db, token, user]);

  // const timestamp= firebase.firestore.Timestamp;
  // function setTimestamp(){
  //   const millis = timestamp.now().toMillis()
  //   console.log('millis', millis)
  //   return millis;
  // }

  return (
    <div className='Home'>
      {user ?
        <div>
          {/* {currentPg === pages.welcome && <div className='homeView'>
            <h1>Kai Cards</h1>
            <p>Hello, {user.displayName}</p>
            <button onClick={()=>setcurrentPg(pages.decks)}>continue</button>
          </div>} */}
          {currentPg === pages.decks && <Decks setCurrentDeckName={setCurrentDeckName} currentDeck={allDecks[currentDeckName]} currentDeckName={currentDeckName} decksRef={decksRef} setcurrentPg={setcurrentPg}  allDecks={allDecks} setAllDecks={setAllDecks}  />}

          {currentPg === pages.singleDeck && <SingleDeck currentDeckName={currentDeckName} allDecks={allDecks} decksRef={decksRef} setcurrentPg={setcurrentPg}  />}

          {currentPg === pages.card && <CardContainer currentDeck={allDecks[currentDeckName]} currentDeckName={currentDeckName} decksRef={decksRef} setcurrentPg={setcurrentPg}  />}

          {currentPg === pages.newCard && <NewCard allDecks={allDecks} decksRef={decksRef} currentDeckName={currentDeckName} allCards={Object.keys(allDecks[currentDeckName])} setcurrentPg={setcurrentPg}  />}
        </div>:
        <Landing />
      }
    </div>
  );
}