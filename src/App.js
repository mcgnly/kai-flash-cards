import React, {useState, useEffect, useReducer} from 'react';
import './App.css';
import originalDecks from './decks.json';
import { Card } from './Card';
import { Statistics } from './Statistics';
import getIndexArray from './randomizeDeck';
import reducer from './reducer';

// const emptyCard = {
//   id: null,
//   q: '',
//   a: '',
//   timesCorrect: 0,
//   timesWrong: 0,
//   dateLastCorrect: null,
//   dateLastWrong: null,
// };

function App() {
  const [state, dispatch] = useReducer(reducer, originalDecks);
  const [currentDeck, setCurrentDeck] = useState('');
  const [answerDisplayed, setAnswerDisplay] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(()=>{
  //   console.log('currentDeck', currentDeck)
  //   console.log('currentCardId', currentCardId)
  //   console.log('currentIndex', currentIndex)
  //   console.log('Card', currentDeck && state[currentDeck][currentCardId])
  // }, [currentCardId, currentDeck, currentIndex, state])

  return (
    <div className="App">
      <h2 className='title'>Flashcards</h2>
        <div className='decks'>
          {state && Object.keys(state).map((item)=>{
          return (
            <button
              onClick={()=> {
                setCurrentDeck(item);
                setCurrentCardId(0);
              }}
              // TODO make a class the highlights the current deck
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
            // TODO implement randomize array
            const deck = state[currentDeck];
            const indexArray = getIndexArray(deck)
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

export default App;
