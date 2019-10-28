import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const NewCard = ({ decksRef, currentDeckName, allCards, setcurrentPg })=>{
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
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={()=>setcurrentPg('singleDeck')} aria-label="back">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" alignSelf="flex-end">{currentDeckName}</Typography>
                </Toolbar>
            </AppBar>
            <Typography variant="h6">Add A New Card</Typography>
            <TextField
                // error
                label="Side 1"
                margin="normal"
                variant="outlined"
                onChange={(e)=>(e)=>setQ(e.target.value)}
            />
            <TextField
                // error
                label="Side 2"
                margin="normal"
                variant="outlined"
                onChange={(e)=>(e)=>setA(e.target.value)}
            />
            <Button variant="outlined" color="secondary" size='small' disabled={invalidCardName} onClick={addCardToDb}>Add Card</Button>
        </div>
    );
}
export default NewCard;