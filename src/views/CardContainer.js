
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

export default function CardContainer({deck, allDecks}) {
    const { db } = useContext(FirebaseContext);
    const [cards, setCards] = useState(allDecks[deck]);
    const [index, setIndex] = useState(0);
    // const [currentCard, setCurrentCard] = useState(cards[index]);
    const [answerDisplayed, setAnswerDisplay] = useState(false);
  
    useEffect(()=>{
    }, []);

    function updateCard(cardId) {
        // TODO how do I update a card?
    }

    function nextCard(){
        
        setIndex(index+1)
    }


    console.log('cards', cards, cards)
    return (
        <div>
            <Card currentCard={cards[index]} setAnswerDisplay={setAnswerDisplay} answerDisplayed={answerDisplayed} />
            <Statistics currentCard={cards[index]} />
            <button onClick={nextCard}>Next card</button>
            {/* <NewCard deck={deck} uid={uid}/> */}
        </div>
    );
}