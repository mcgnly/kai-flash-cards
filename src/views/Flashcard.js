import React from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

export default function FlashCard({ currentCard, setAnswerDisplay, answerDisplayed,incrementTimesCorrect, incrementTimesWrong }) {
    return (
        <Card className='stdMargin'>
            <CardContent>
                <Typography variant="h5" style={{margin:'10px 0 20px 0'}}>{currentCard.q}</Typography>
                {!answerDisplayed ? 
                <Button variant="outlined" color="secondary" size='small'                 onClick={()=>setAnswerDisplay(!answerDisplayed)}
                >show</Button>:
                <div>
                    <Divider />
                    <Typography variant="h5" style={{margin:'20px 0 10px 0'}}>{currentCard.a}</Typography>
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
            </CardContent>
        </Card>
    )
}
