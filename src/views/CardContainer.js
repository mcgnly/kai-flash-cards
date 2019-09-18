
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

export default function CardContainer({currentDeck, decksRef}) {
    console.log('in card cont', currentDeck)
    const { db } = useContext(FirebaseContext);
    const [currentCard, setCurrentCard] = useState({'init': emptyCard});
    const [index, setIndex] = useState(0);
    const [answerDisplayed, setAnswerDisplay] = useState(false);
    
    useEffect(()=>{
        const cardKeys = Object.keys(currentDeck);
        const currentCardKey = cardKeys[index];
        setCurrentCard(currentDeck[currentCardKey]);
    }, [currentDeck, index]);

    function updateCard(cardId) {
        // TODO how do I update a card?
    }

    function nextCard(){

        setIndex(index+1)
    }

    return (
        <div>
            <Card currentCard={currentCard} setAnswerDisplay={setAnswerDisplay} answerDisplayed={answerDisplayed} />
            <Statistics currentCard={currentCard} />
            <button onClick={nextCard}>Next card</button>
            {/* <NewCard deck={deck} uid={uid}/> */}
        </div>
    );
}