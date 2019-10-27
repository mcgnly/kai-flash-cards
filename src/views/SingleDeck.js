import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import FirebaseContext from '../utils/firebaseContext';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function SingleDeck({ allDecks, decksRef, currentDeckName, setcurrentPg }){
    const { firebase } = useContext(FirebaseContext);
    const [showCardList, setShowCardList] = useState(false);

    const currentDeck = allDecks[currentDeckName];

    // function deleteCard(cardKey) {
    //     const dotString = `${currentDeckName}.${cardKey}`;
    //     decksRef.update({
    //         [dotString]: firebase.firestore.FieldValue.delete()
    //     });
    // }

    function deleteDeck(specificDeck) {
        decksRef.update({
            [currentDeckName]: firebase.firestore.FieldValue.delete()
        }).then(()=>{
            const newAllDecks = {...allDecks}
            delete newAllDecks[currentDeckName]
            setcurrentPg('decks')
            // setCurrentDeckName('')
            // setAllDecks(newAllDecks)
        });
    }

    const classes = useStyles();

    return (
        <div>
            <IconButton onClick={()=>setcurrentPg('decks')} aria-label="back" >
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="overline" gutterBottom align='center'>
                {currentDeckName}
            </Typography>

            {currentDeckName && 
            <div>
                <Button className={classes.button} variant="contained" color="primary" onClick={()=>setcurrentPg('card')}>start!</Button>
                {!showCardList && <Button className={classes.button} variant="contained" color="primary" onClick={()=>setShowCardList(true)}>show list of cards</Button>}
                {showCardList && Object.keys(currentDeck).map((cardKey)=>
                <div>
                    <Card className={classes.button} onClick={()=>setcurrentPg('card')}>
                        <CardContent>
                            {cardKey}
                        </CardContent>
                    </Card>
                </div>
                )}
                <Button className={classes.button} variant="outlined" color="primary"  onClick={()=>setcurrentPg('newCard')}>make new card</Button>
                <Button variant="outlined" color="secondary" size='small'  onClick={(e) => {
                            if (window.confirm('Are you sure you wish to delete this whole deck?')){
                                deleteDeck()
                            } 
                        }}>Delete this deck</Button>
            </div>
            }
        </div>
    )
}
