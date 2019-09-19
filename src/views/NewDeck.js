import React, { useState } from 'react';

export default function NewDeck({decksRef, allDecks}){
    const [newDeckName, setNewDeckName] = useState('');

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
                <button onClick={makeNewDeck} >Create new deck</button>
            </label>
        </div>
    )
}
