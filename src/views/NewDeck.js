import React, { useContext, useEffect, useState } from 'react';
import FirebaseContext from '../utils/firebaseContext';
import NewCard from './NewCard';


export default function NewDeck({uid}){
    const [newDeck, setNewDeck] = useState('');

    return (
        <div>
            <label>
                Make a New Deck:
                <input type="text" name="deck" onChange={(e)=>setNewDeck(e.target.value)}/>
            </label>
            <NewCard deck={newDeck} uid={uid}/>
        </div>
    )
}
