import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './css/Card.css';

export default function Card({ currentCard, setAnswerDisplay, answerDisplayed,incrementTimesCorrect, incrementTimesWrong }) {
    return (
        <div className='currentCard'>
          <Typography variant="h5">Question: {currentCard.q}</Typography>
          {!answerDisplayed ? 
          <Button variant="outlined" color="secondary" size='small'                 onClick={()=>setAnswerDisplay(!answerDisplayed)}
          >Answer?</Button>:
            <div>
                <Typography variant="h5">{currentCard.a}</Typography>
                {/* <button 
                className='answerButton'
                onClick={()=>incrementTimesCorrect()
                }>got it!</button>
                <button 
                className='answerButton'
                onClick={()=>incrementTimesWrong()
                }>didn't get it :(</button> */}
            </div>
            }
        </div>
    )
}
