
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

export default function CardContainer({currentDeck, decksRef, currentDeckName}) {
    const { firebase } = useContext(FirebaseContext);
    const [currentCard, setCurrentCard] = useState({'init': emptyCard});
    const [index, setIndex] = useState(0);
    const [answerDisplayed, setAnswerDisplay] = useState(false);
    const [cardsLength, setCardsLength] = useState(0);
    const [currentCardKey, setCurrentCardKey] = useState('');
    const [deckIsNotEmpty, setDeckIsNotEmpty] = useState(false);
    const [deleteBtnClass, setDeleteBtnClass] = useState({});
    const [deleteBtnString, setDeleteBtnString] = useState('delete this card');
    const [deleteBtnClick, setDeleteBtnClick] = useState(deleteCard1);

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

    function deleteCard1() {
        setDeleteBtnString('yes I am really really sure!')
        setDeleteBtnClass({backgroundColor: 'tomato'})
        // setDeleteBtnClick(()=>deleteCard2)
    }
    function deleteCard2() {
        // updates[`songList.${song}`] = admin.firestore.FieldValue.delete();
        console.log('gonna delete it!')
    }

    return (
        <div>
            {deckIsNotEmpty && 
            <div>
                <div>({index+1}/{cardsLength})</div>
                <Card currentCard={currentCard} setAnswerDisplay={setAnswerDisplay} answerDisplayed={answerDisplayed} incrementTimesCorrect={()=>incrementCount('correct')} incrementTimesWrong={()=>incrementCount('wrong')} />
                <Statistics currentCard={currentCard} />
                <button disabled={index+1===cardsLength} onClick={nextCard}>Next card</button>
                <button style={deleteBtnClass} onClick={()=>deleteBtnClick}>{deleteBtnString}</button>
            </div>
            }
        </div>
    );
}