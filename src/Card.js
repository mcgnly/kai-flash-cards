import React, {useState} from 'react';
import './Card.css';

function Card({ currentCard, setAnswerDisplay, answerDisplayed }) {
    return (
        <div className='currentCard'>
          <p>Question: {currentCard.q}</p>
          {!answerDisplayed ? 
          <button 
            className='answerButton'
            onClick={()=>setAnswerDisplay(!answerDisplayed)
            }>Reveal answer</button> :
            <p>Answer: {currentCard.a}</p>
            }
        </div>
    )
}
export {Card};
