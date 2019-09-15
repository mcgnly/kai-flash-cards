import React, {useState} from 'react';
import './css/Statistics.css';

export default function Statistics({ currentCard }) {
    return (
        <div>
            <p>right : wrong</p>
            <p>{currentCard.timesCorrect} : {currentCard.timesWrong}</p>
            <p>date last correct: {currentCard.dateLastCorrect}</p>
        </div>
    );
}
      