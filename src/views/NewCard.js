import React, { useContext, useState } from 'react';
import FirebaseContext from '../utils/firebaseContext';


const NewCard = ({ deckRef, allDecks, currentDeckName })=>{
    const { db } = useContext(FirebaseContext);
    const [q, setQ] = useState('');
    const [a, setA] = useState('');

function addCardToDb(){
    const newCard = {[q]:{
        q: q,
        a: a,
        timesCorrect: 0,
        timesWrong: 0
    }}
    // deckRef.add({
    //         q,
    //         a,
    //         timesCorrect: 0,
    //         timesWrong: 0,
//   }).then(function() {
//     console.log("card created");
//   });
}

return (
    <div>
        <p>Create a new card in the deck {currentDeckName}</p>
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