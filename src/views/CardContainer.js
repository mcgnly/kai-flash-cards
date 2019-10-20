
import React, {useState, useContext, useEffect} from 'react';
import FirebaseContext from '../utils/firebaseContext';
import Card from './Card';
import Statistics from './Statistics';
import './css/Card.css';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const emptyCard = {
  id: null,
  q: '',
  a: '',
  timesCorrect: 0,
  timesWrong: 0,
  dateLastCorrect: null,
  dateLastWrong: null,
};

export default function CardContainer({currentDeck, decksRef, currentDeckName, setcurrentPg }) {
    const { firebase } = useContext(FirebaseContext);
    const [currentCard, setCurrentCard] = useState({'init': emptyCard});
    const [index, setIndex] = useState(0);
    const [answerDisplayed, setAnswerDisplay] = useState(false);
    const [cardsLength, setCardsLength] = useState(0);
    const [currentCardKey, setCurrentCardKey] = useState('');
    const [deckIsNotEmpty, setDeckIsNotEmpty] = useState(false);

    useEffect(()=>{
        const isNotEmpty= Object.getOwnPropertyNames(currentDeck).length > 0;
        setDeckIsNotEmpty(isNotEmpty)
        if (currentDeck) {
            const keys = Object.keys(currentDeck);
            const currentKey = keys[index];
            setCurrentCardKey(currentKey);
            setCardsLength(keys.length);
            setCurrentCard(currentDeck[currentKey]);
        }
    }, [currentDeck, index]);

    function nextCard(){
        const maxIndex = cardsLength-1;
        if (index<maxIndex) {
            setIndex(index+1)
        }
        return;
    }

    function incrementCount(key){
        // french.hello.timesCorrect
        const dotStringCount = `${currentDeckName}.${currentCardKey}.${key}Count`;
        const dotStringTime = `${currentDeckName}.${currentCardKey}.${key}Timestamp`;
        decksRef.update({
            [dotStringCount]: currentCard[key+'Count']+1,
            [dotStringTime]: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(()=>
            console.log("count updated!")
        )
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    function deleteCard() {
        const dotString = `${currentDeckName}.${currentCardKey}`;
        decksRef.update({
            [dotString]: firebase.firestore.FieldValue.delete()
        }).then(()=>{
            nextCard()
        });
    }
    

    return (
        <div>
            <IconButton onClick={()=>setcurrentPg('decks')} aria-label="back">
                <ArrowBackIcon />
            </IconButton>

            {deckIsNotEmpty && 
            <div>
                <Typography variant="h5">({index+1}/{cardsLength})</Typography>
                <Card currentCard={currentCard} setAnswerDisplay={setAnswerDisplay} answerDisplayed={answerDisplayed} 
                // incrementTimesCorrect={()=>incrementCount('correct')} incrementTimesWrong={()=>incrementCount('wrong')} 
                />
                {/* <Statistics currentCard={currentCard} /> */}
                <Button variant="outlined" color="secondary" size='small'  onClick={() => {
                        if (window.confirm('Are you sure you wish to delete this item?')){
                            deleteCard()
                        }
                    }}>x</Button>
                <IconButton disabled={index+1===cardsLength} onClick={nextCard}aria-label="next">
                    <ArrowForwardIcon />
                </IconButton>
            </div>
            }
        </div>
    );
}