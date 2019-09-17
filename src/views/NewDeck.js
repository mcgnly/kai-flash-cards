import React, { useState } from 'react';

export default function NewDeck({uid}){
    const [newDeck, setNewDeck] = useState('');

    return (
        <div>
            <label>
                Make a New Deck:
                <input type="text" name="deck" onChange={(e)=>setNewDeck(e.target.value)}/>
            </label>
        </div>
    )
}
