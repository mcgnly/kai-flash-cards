import React, { useState } from 'react';

const NewCard = ({ decksRef, currentDeckName })=>{
    const [q, setQ] = useState('');
    const [a, setA] = useState('');

function addCardToDb(){
    const newCard = {
        q: q,
        a: a,
        correctCount: 0,
        wrongCount: 0
    }
    const dotString = `${currentDeckName}.${q}`;

    decksRef.update({[dotString]: newCard})
    .then(()=>
        console.log("Document successfully written!")
    )
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

return (
    <div>
        <p>Create a new card in the deck {currentDeckName}</p>
        <div>
            Question Side:
        </div>
        <input type="text" name="q" onChange={(e)=>setQ(e.target.value)}/>
        <div>
            Answer Side:
        </div>
        <input type="text" name="a" onChange={(e)=>setA(e.target.value)}/>
        <button onClick={addCardToDb}>Create new card!</button>
    </div>
);
}
export default NewCard;