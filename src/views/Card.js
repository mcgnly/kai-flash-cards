import React, {useState} from 'react';
import './css/Card.css';

export default function Card({ currentCard, setAnswerDisplay, answerDisplayed,incrementTimesCorrect, incrementTimesWrong }) {
    return (
        <div className='currentCard'>
          <p>Question: {currentCard.q}</p>
          {!answerDisplayed ? 
          <button 
            className='answerButton'
            onClick={()=>setAnswerDisplay(!answerDisplayed)
            }>Reveal answer</button> :
            <div>
                <p>Answer: {currentCard.a}</p>
                <button 
                className='answerButton'
                onClick={()=>incrementTimesCorrect()
                }>got it!</button>
                <button 
                className='answerButton'
                onClick={()=>incrementTimesWrong()
                }>didn't get it :(</button>
            </div>
            }
        </div>
    )
}
