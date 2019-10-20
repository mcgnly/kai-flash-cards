import React, { useContext } from 'react';
import FirebaseContext from '../utils/firebaseContext';
import NewDeck from './NewDeck';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function Decks({ setCurrentDeckName, allDecks, currentDeckName, decksRef, setcurrentPg, setAllDecks }){
    const { firebase } = useContext(FirebaseContext);

    function deleteDeck(specificDeck) {
        decksRef.update({
            [specificDeck]: firebase.firestore.FieldValue.delete()
        }).then(()=>{
            const newAllDecks = {...allDecks}
            delete newAllDecks[specificDeck]
            setCurrentDeckName('')
            setAllDecks(newAllDecks)
        });
    }

    const classes = useStyles();

    return (
            <div className='decksView'>
                <h1>Your decks</h1>
                { Object.keys(allDecks).map((item)=>(
                    <div>
                        <Button variant="contained" color="primary" className={classes.button} key={item} onClick={()=>{
                            setCurrentDeckName(item)
                            setcurrentPg('singleDeck')
                            }}>
                            {item}
                        </Button>
                        <Button variant="outlined" color="secondary" size='small'  onClick={(e) => {
                            if (window.confirm('Are you sure you wish to delete this whole deck?')){
                                deleteDeck(item)
                            } 
                        }}> X </Button>
                    </div>
                )) }
            <NewDeck classes={classes} allDecks={allDecks} decksRef={decksRef}/>
        </div>
    )
}
