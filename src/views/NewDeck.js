import React, { useState, useEffect } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import TextField from '@material-ui/core/TextField';


export default function NewDeck({decksRef, allDecks, classes}){
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
        });
    }

    return (
        <div>
            <TextField
                label="Add A New Deck"
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={(e)=>setNewDeckName(e.target.value)}
            />
            <IconButton disabled={invalidDeckName} onClick={makeNewDeck}  className={classes.button} aria-label="add deck">
                <AddCircleIcon />
            </IconButton>
        </div>
    )
}
