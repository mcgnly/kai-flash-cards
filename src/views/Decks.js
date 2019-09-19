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

export default function Decks({uid}){
    const { db } = useContext(FirebaseContext);
    const [allDecks, setAllDecks] = useState({});
    const [decksRef, setDecksRef] = useState({});
    const [currentDeckName, setCurrentDeckName] = useState('');

    useEffect(()=>{
        const documentReference = db.collection('users').doc(uid);
        setDecksRef(documentReference);
        documentReference.get()
            .then(doc => {
                if (doc.exists){
                    const allDecks = doc.data();
                    setAllDecks(allDecks);
                }
            });
    }, [db, uid]);

    function deckIsNotEmpty() {
        const isNotEmpty= Object.getOwnPropertyNames(allDecks[currentDeckName]).length > 0;
        return isNotEmpty;
    }

    return (
        <div>
            <ul>
                { Object.keys(allDecks).map((item)=>(
                    <li onClick={()=>setCurrentDeckName(item)}>{item}</li>
                )) }
            </ul>
            <h2>Current deck is:</h2>
            <p>{currentDeckName}</p>
            {currentDeckName && 
            <div>
                { deckIsNotEmpty() && 
                <CardContainer currentDeck={allDecks[currentDeckName]} currentDeckName={currentDeckName} decksRef={decksRef} />}
                <NewCard allDecks={allDecks} decksRef={decksRef} currentDeckName={currentDeckName} />
            </div>
            }
            <div>-----------</div>
            <NewDeck allDecks={allDecks} decksRef={decksRef}/>
        </div>
    )
}
