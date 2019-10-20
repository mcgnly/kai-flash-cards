import React, { useContext } from 'react';
import FirebaseContext from '../utils/firebaseContext';

export default function SingleDeck({ allDecks, decksRef, currentDeckName, setcurrentPg }){
    const { firebase } = useContext(FirebaseContext);

    const currentDeck = allDecks[currentDeckName];

    function deleteCard(cardKey) {
        const dotString = `${currentDeckName}.${cardKey}`;
        decksRef.update({
            [dotString]: firebase.firestore.FieldValue.delete()
        });
    }

    return (
        <div>
            <button className='backBtn' onClick={()=>setcurrentPg('decks')}>back to decks</button>
            <h2>Current deck is:</h2>
            <p>{currentDeckName}</p>
            {currentDeckName && 
            <div>
                <div className='primaryBtn' onClick={()=>setcurrentPg('card')}>start!</div>
                {Object.keys(currentDeck).map((cardKey)=>
                <div>
                    <div className='primaryBtn' onClick={()=>setcurrentPg('card')}>{cardKey}</div>
                    <button className='deleteBtn' onClick={() => {
                        if (window.confirm('Are you sure you wish to delete this item?')){
                            deleteCard(cardKey)
                        }
                    }}>x</button>
                </div>
                )}
                <div className='primaryBtn' onClick={()=>setcurrentPg('newCard')}>make new card</div>
            </div>
            }
        </div>
    )
}
