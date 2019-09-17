
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

export default function CardContainer({uid, deck}) {
    const { db } = useContext(FirebaseContext);
    const [cards, setCards] = useState([emptyCard]);
    const [index, setIndex] = useState(0);
    // const [currentCard, setCurrentCard] = useState(cards[index]);
    const [answerDisplayed, setAnswerDisplay] = useState(false);
  
    useEffect(()=>{
        if (uid && deck){
            let tempCards = [];
            db.collection('users').doc(uid).collection('decks').doc(deck).collection('cards').get()
            .then(querySnapshot => {
                console.log('q snap', querySnapshot.docs)
                querySnapshot.docs.forEach(doc => {
                    console.log('doc', doc.data())
                    tempCards.push(doc.data());
                });
                setCards(tempCards);
            }); 
        }
    }, [db, uid, deck]);

    function updateCard(cardId) {
        // TODO how do I update a card?
        db.collection('users').doc(uid).collection('decks').doc(deck).collection('cards').doc(cardId).update({something:'something'})
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
            <NewCard deck={deck} uid={uid}/>
        </div>
    );
}