import React from 'react';
import NewDeck from './NewDeck';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export default function Decks({ setCurrentDeckName, allDecks, currentDeckName, decksRef, setcurrentPg, setAllDecks }){

    const classes = useStyles();

    return (
            <div className='decksView'>
                <Typography variant="overline" gutterBottom align='center'> 
                    All Decks
                </Typography>

                { Object.keys(allDecks).map((item)=>(
                    <div>
                        <Card
                        className={classes.button}
                        onClick={()=>{
                            setCurrentDeckName(item)
                            setcurrentPg('singleDeck')
                            }}>
                            <CardContent>
                                <Typography variant="body1">
                                    {item}
                                </Typography>
                            </CardContent>
                        </Card>
                        {/* 
                         */}
                    </div>
                )) }
            <NewDeck classes={classes} allDecks={allDecks} decksRef={decksRef}/>
        </div>
    )
}
