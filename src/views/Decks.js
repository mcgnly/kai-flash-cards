import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../utils/firebaseContext';
import NewDeck from './NewDeck';
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
    const [myDecks, setMyDecks] = useState({});
    const [currentDeck, setCurrentDeck] = useState('');
  
    useEffect(()=>{
        db.collection('users').doc(uid).get()
            .then(doc => {
                if (doc.exists){
                    const allDecks = doc.data();
                    console.log('doc', allDecks)
                    setMyDecks(allDecks);
                }
            });
    }, [db, uid]);

    return (
        <div>
            <ul>
                { Object.keys(myDecks).map((item)=>(
                    <li onClick={()=>setCurrentDeck(item)}>{item}</li>
                )) }
            </ul>
            <h2>Current deck is:</h2>
            <p>{currentDeck}</p>
            <CardContainer deck={currentDeck} allDecks={myDecks}/>
            <div>-----------</div>
            <NewDeck uid={uid}/>
        </div>
    )
}
