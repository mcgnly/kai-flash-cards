
import React, {useState, useContext, useEffect} from 'react';
import FirebaseContext from '../utils/firebaseContext';
import Card from './Card';
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

export default function CardContainer({uid, deck}) {
    const { db } = useContext(FirebaseContext);
    const [cards, setCards] = useState([]);
    const [index, setIndex] = useState(0);
    const [currentCard, setCurrentCard] = useState(emptyCard);
    const [answerDisplayed, setAnswerDisplay] = useState(false);
  
    useEffect(()=>{
        let tempCards = [];
        db.collection('users').doc(uid).collection('decks').doc(deck).get()
            .then(querySnapshot => {
                querySnapshot.docs.forEach(doc => {
                    tempCards.push(doc.id);
                });
            }); 
            setCards(tempCards);
    }, [db, uid, deck]);

    function updateCard(cardId) {
        // TODO how do I update a card?
        db.collection('users').doc(uid).collection('decks').doc(deck).collection('cards').doc(cardId).update({something:'something'})
    }

    function nextCard(){
        setCurrentCard(cards[index+1])
        setIndex(index+1)
    }

    return (
        <div>
            <Card currentCard={currentCard} setAnswerDisplay={setAnswerDisplay} answerDisplayed={answerDisplayed} />
            <Statistics currentCard={currentCard} />
            <button onClick={nextCard}>Next card</button>
        </div>
    );
}