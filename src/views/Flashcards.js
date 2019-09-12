import React, {useState, useEffect, useReducer} from 'react';
import './css/Home.css';
// import originalDecks from '../decks.json';
import { Card } from './Card';
import { Statistics } from './Statistics';
import getIndexArray from '../utils/randomizeDeck';
import reducer from '../utils/reducer';

// const emptyCard = {
//   id: null,
//   q: '',
//   a: '',
//   timesCorrect: 0,
//   timesWrong: 0,
//   dateLastCorrect: null,
//   dateLastWrong: null,
// };

function Flashcards({ myDecks }) {
  console.log('my decks', myDecks)

  const [state, dispatch] = useReducer(reducer, {});
  // const [state, dispatch] = useReducer(reducer, originalDecks);
  const [currentDeck, setCurrentDeck] = useState('');
  const [answerDisplayed, setAnswerDisplay] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [indexArray, setIndexArray] = useState([]);

  useEffect(()=>{
    const newIndexArray = currentDeck && getIndexArray(state[currentDeck]);
    setIndexArray(newIndexArray);
  }, [currentDeck, state])

  return (
    <div className="Home">
      <h2 className='title'>Flashcards</h2>
        <div className='decks'>
          {state && Object.keys(state).map((item)=>{
            const deckClass = item===currentDeck ? 'activeDeck' : '';
          return (
            <button
              key={item}
              className={deckClass}
              onClick={()=> {
                setCurrentDeck(item);
                setCurrentIndex(0);
              }}
            >
              {item}
            </button>  
          )
        })}
        </div>
      {currentDeck &&
        <Card currentCard={state[currentDeck][currentCardId]} 
        setAnswerDisplay={setAnswerDisplay} answerDisplayed={answerDisplayed} />
      }
      {answerDisplayed && 
        <div>
          <p>Did you get it right?</p>
          <button
            className='btn'
            onClick={()=>dispatch({
              type: 'updateStatsCorrect',
              payload: {
                currentDeck,
                currentCardId
              }
            })}
          >
            yes
          </button>
          <button
            className='btn'
            onClick={()=>dispatch({
              type: 'updateStatsWrong',
              payload: {
                currentDeck,
                currentCardId
              }
            })}
          >
            no
          </button>
        </div>}
        {currentDeck &&
        <Statistics currentCard={state[currentDeck][currentCardId] || {}} />
        }
      
        {currentDeck && <button
          className='btn'
          onClick={()=>{
            // indexArray = [2,0,3,1]
            const maxIndex = indexArray.length-1;
            const newCurrentIndex = currentIndex<maxIndex ? currentIndex+1 : currentIndex;
            setCurrentIndex(newCurrentIndex)
            setCurrentCardId(indexArray[newCurrentIndex]);
          }}>
          Next card
        </button>
      }
    </div>
  );
}

export default Flashcards;
