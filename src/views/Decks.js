import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../utils/firebaseContext';
import NewDeck from './NewDeck';
import SingleDeck from './SingleDeck';
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
    const { db, firebase } = useContext(FirebaseContext);
    const [allDecks, setAllDecks] = useState({});
    const [decksRef, setDecksRef] = useState({});
    const [currentDeckName, setCurrentDeckName] = useState('');
    const timestamp= firebase.firestore.Timestamp;

    useEffect(()=>{
        const documentReference = db.collection('users').doc(uid);
        setDecksRef(documentReference);
        
        documentReference.update({
            millis: setTimestamp()
        }).then(()=>
        documentReference.get()
            .then(doc => {
                if (doc.exists){
                    const allDecksFromData = doc.data();
                    console.log('doc info', allDecksFromData)
                    setAllDecks(allDecksFromData);
                }
            }))
    }, [db, uid]);

    function setTimestamp(){
        const millis = timestamp.now().toMillis()
        console.log('millis', millis)
        return millis;
    }

    function deleteDeck(specificDeck) {
        decksRef.update({
            [specificDeck]: firebase.firestore.FieldValue.delete()
        }).then(()=>{
            const newAllDecks = {...allDecks}
            delete newAllDecks[specificDeck]
            setCurrentDeckName('')
            setAllDecks(newAllDecks)
        });
    }

    return (
        <div>
            <div className='decksView'>
                <ul>
                    { Object.keys(allDecks).map((item)=>(
                        <li key={item} onClick={()=>setCurrentDeckName(item)}>
                            <div>
                                {item}
                                <button className='deleteDeck' onClick={(e) => {
                                    if (window.confirm('Are you sure you wish to delete this whole deck?')){
                                        deleteDeck(item)
                                    } 
                                }}> X </button>
                            </div>
                        </li>
                    )) }
                </ul>
                <NewDeck allDecks={allDecks} decksRef={decksRef}/>
            </div>
                <SingleDeck currentDeckName={currentDeckName} allDecks={allDecks} decksRef={decksRef} />
        </div>
    )
}
