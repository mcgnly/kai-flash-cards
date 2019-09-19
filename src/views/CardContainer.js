
import React, {useState, useContext, useEffect} from 'react';
import FirebaseContext from '../utils/firebaseContext';
import Card from './Card';
import NewCard from './NewCard';
import Statistics from './Statistics';
import './css/Card.css';

const emptyCard = {
  id: null,
  q: '',
  a: '',
  timesCorrect: 0,
  timesWrong: 0,
  dateLastCorrect: null,
  dateLastWrong: null,
};

export default function CardContainer({currentDeck, decksRef, currentDeckName}) {
    const { firebase } = useContext(FirebaseContext);
    const [currentCard, setCurrentCard] = useState({'init': emptyCard});
    const [index, setIndex] = useState(0);
    const [answerDisplayed, setAnswerDisplay] = useState(false);
    const [cardsLength, setCardsLength] = useState(0);
    const [currentCardKey, setCurrentCardKey] = useState('');
    useEffect(()=>{
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
            [dotStringCount]: currentCard[key]+1,
            [dotStringTime]: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(()=>
            console.log("count updated!")
        )
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    return (
        <div>
            <Card currentCard={currentCard} setAnswerDisplay={setAnswerDisplay} answerDisplayed={answerDisplayed} incrementTimesCorrect={()=>incrementCount('correct')} incrementTimesWrong={()=>incrementCount('wrong')} />
          
            <Statistics currentCard={currentCard} />
            <button onClick={nextCard}>Next card</button>
        </div>
    );
}