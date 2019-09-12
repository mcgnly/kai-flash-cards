import React, { useContext, useState } from 'react';
import FirebaseContext from '../utils/firebaseContext';

const NewCard = ({ uid, deck })=>{
    const { db } = useContext(FirebaseContext);
    const [q, setQ] = useState('');
    const [a, setA] = useState('');

function addCardToDb(){
    const deckRef = db.collection('users').doc(uid).collection('decks')
        .doc(deck)
        .collection('cards');

    deckRef.add({
            q,
            a,
            timesCorrect: 0,
            timesWrong: 0,
  }).then(function() {
    console.log("card created");
  });
}

return (
    <div>
        <p>Create a new card in the deck {deck}</p>
        <form>
        <label>
            Question Side:
            <input type="text" name="q" onChange={(e)=>setQ(e.target.value)}/>
        </label>
        <label>
            Answer Side:
            <input type="text" name="a" onChange={(e)=>setA(e.target.value)}/>
        </label>
        </form>
        <button onClick={addCardToDb}>Create new card!</button>
    </div>
);
}
export default NewCard;