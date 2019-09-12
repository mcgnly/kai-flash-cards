import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../utils/firebaseContext';
import NewDeck from './NewDeck';


export default function Decks({uid}){
    const { db } = useContext(FirebaseContext);
    const [myDecks, setMyDecks] = useState([]);
    const [currentDeck, setCurrentDeck] = useState('');
  
    useEffect(()=>{
        let tempDecks = [];
        db.collection('users').doc(uid).collection('decks').get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    tempDecks.push(doc.data().name);
                });
                setMyDecks(tempDecks);
            }); 
    }, [db, uid]);

    return (
        <div>
            <ul>
                { myDecks.map((item)=>(
                        <li onClick={()=>setCurrentDeck(item)}>{item}</li>
                    )) }
            </ul>
            <h2>Current deck is:</h2>
            <p>{currentDeck}</p>
            <NewDeck uid={uid}/>
        </div>
    )
}
