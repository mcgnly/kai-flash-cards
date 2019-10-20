import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
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

    const currentDeck = allDecks[currentDeckName];

    function deleteCard(cardKey) {
        const dotString = `${currentDeckName}.${cardKey}`;
        decksRef.update({
            [dotString]: firebase.firestore.FieldValue.delete()
        });
    }

    const classes = useStyles();

    return (
        <div>
            <IconButton onClick={()=>setcurrentPg('decks')} aria-label="back">
                <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5" gutterBottom>
                {currentDeckName}
            </Typography>
            <p></p>
            {currentDeckName && 
            <div>
                <Button className={classes.button} variant="contained" color="primary" onClick={()=>setcurrentPg('card')}>start!</Button>
                {Object.keys(currentDeck).map((cardKey)=>
                <div>
                    <Button className={classes.button} variant="contained" color="primary"  onClick={()=>setcurrentPg('card')}>{cardKey}</Button>
                    <Button className={classes.button} variant="outlined" color="secondary" size='small'  onClick={() => {
                        if (window.confirm('Are you sure you wish to delete this item?')){
                            deleteCard(cardKey)
                        }
                    }}>x</Button>
                </div>
                )}
                <Button className={classes.button} variant="outlined" color="primary"  onClick={()=>setcurrentPg('newCard')}>make new card</Button>
            </div>
            }
        </div>
    )
}
