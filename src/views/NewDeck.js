import React, { useState, useEffect } from 'react';

export default function NewDeck({decksRef, allDecks}){
    const [newDeckName, setNewDeckName] = useState('');
    const [invalidDeckName, setInvalidDeckName] = useState(true);
    const DECKS_LIMIT = 100;

    useEffect(()=>{
        const decksArray = Object.keys(allDecks);
        const nameOK = (newDeckName.length>0 && !decksArray.includes(newDeckName))
        const notTooManyDecks = decksArray.length < DECKS_LIMIT;
        setInvalidDeckName(!nameOK && !notTooManyDecks)
    }, [newDeckName, allDecks])

    function makeNewDeck(){
        const newDecks = {...allDecks, [newDeckName]:{}}
        decksRef.set(newDecks).then(function() {
            console.log("new deck successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing deck: ", error);
        });;
    }

    return (
        <div>
                <label>
                    Make a New Deck:
                    <input type="text" name="deck" onChange={(e)=>setNewDeckName(e.target.value)}/>
                    <button disabled={invalidDeckName} onClick={makeNewDeck} >Create new deck</button>
                </label>
        </div>
    )
}
