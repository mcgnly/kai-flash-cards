import React, { useState, useEffect } from 'react';

const NewCard = ({ decksRef, currentDeckName, allCards })=>{
    const [q, setQ] = useState('');
    const [a, setA] = useState('');
    const [invalidCardName, setInvalidCardName] = useState(true)
    const CARDS_LIMIT = 100;
    
    useEffect(()=>{
        const nameOK = (q.length>0 && a.length>0 && !allCards.includes(q))
        const notTooManyCards = allCards.length < CARDS_LIMIT;
        setInvalidCardName(!nameOK && !notTooManyCards)
    }, [q, a, allCards])

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
            <button disabled={invalidCardName} onClick={addCardToDb}>Create new card!</button>
        </div>
    );
}
export default NewCard;