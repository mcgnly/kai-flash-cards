import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../utils/firebaseContext';
import NewDeck from './NewDeck';
import NewCard from './NewCard';
import CardContainer from './CardContainer';

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

export default function SingleDeck({uid}){
    const { db, firebase } = useContext(FirebaseContext);
    const [allDecks, setAllDecks] = useState({});
    const [decksRef, setDecksRef] = useState({});
    const [currentDeckName, setCurrentDeckName] = useState('');
    const timestamp= firebase.firestore.Timestamp;

    // useEffect(()=>{

    // }, [db, uid]);

    function setTimestamp(){
        const millis = timestamp.now().toMillis()
        console.log('millis', millis)
        return millis;
    }

    function deleteDeck() {
        decksRef.update({
            [currentDeckName]: firebase.firestore.FieldValue.delete()
        }).then(()=>{
            const newAllDecks = {...allDecks}
            delete newAllDecks[currentDeckName]
            setCurrentDeckName('')
            setAllDecks(newAllDecks)
        });
    }

    return (
        <div>
            <h2>Current deck is:</h2>
            <p>{currentDeckName}</p>
            {currentDeckName && 
            <div>
                <CardContainer currentDeck={allDecks[currentDeckName]} currentDeckName={currentDeckName} decksRef={decksRef} />
                <NewCard allDecks={allDecks} decksRef={decksRef} currentDeckName={currentDeckName} allCards={Object.keys(allDecks[currentDeckName])} />
            </div>
            }
        </div>
    )
}
