
import React, {useState, useContext, useEffect} from 'react';
import FirebaseContext from '../utils/firebaseContext';
import Flashcard from './Flashcard';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Divider from '@material-ui/core/Divider';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

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
    const [answerDisplayed, setAnswerDisplay] = useState(true);
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

    function previousCard(){
        if (index>0) {
            setIndex(index-1)
        }
        return;
    }

    // function incrementCount(key){
    //     // french.hello.timesCorrect
    //     const dotStringCount = `${currentDeckName}.${currentCardKey}.${key}Count`;
    //     const dotStringTime = `${currentDeckName}.${currentCardKey}.${key}Timestamp`;
    //     decksRef.update({
    //         [dotStringCount]: currentCard[key+'Count']+1,
    //         [dotStringTime]: firebase.firestore.FieldValue.serverTimestamp()
    //     })
    //     .then(()=>
    //         console.log("count updated!")
    //     )
    //     .catch(function(error) {
    //         console.error("Error writing document: ", error);
    //     });
    // }

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
            <AppBar position="static" className='noMargin'>
                <Toolbar>
                <IconButton edge="start" color="inherit" onClick={()=>setcurrentPg('singleDeck')} aria-label="back">
                    <ArrowBackIcon />
                </IconButton>
                    <Typography variant="overline">({index+1}/{cardsLength})</Typography>
                </Toolbar>
            </AppBar>

            {deckIsNotEmpty && 
            <div>
                <Flashcard currentCard={currentCard} setAnswerDisplay={setAnswerDisplay} answerDisplayed={answerDisplayed} 
                // incrementTimesCorrect={()=>incrementCount('correct')} incrementTimesWrong={()=>incrementCount('wrong')} 
                />
                <IconButton disabled={index===0} onClick={previousCard}aria-label="previous">
                    <ArrowBackIcon />
                </IconButton>
                {/* <Statistics currentCard={currentCard} /> */}
                <IconButton disabled={index+1===cardsLength} onClick={nextCard}aria-label="next">
                    <ArrowForwardIcon />
                </IconButton>
                <Divider />
                <Button variant="outlined" color="secondary" size='small'  onClick={() => {
                        if (window.confirm('Are you sure you wish to delete this item?')){
                            deleteCard()
                        }
                    }}>Delete this card</Button>
            </div>
            }
        </div>
    );
}