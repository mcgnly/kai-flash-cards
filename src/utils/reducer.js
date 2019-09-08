export default function reducer(state, action) {
  const { currentDeck, currentCardId } = action.payload;
  const card = ((state[currentDeck] || {})[currentCardId] || {});
  const today = new Date();
  const todayStr = today.toDateString()

  function updateMasterDeck(newCard){
    const updatedDeck = {...state[currentDeck], [newCard.id]: newCard}
    return {...state, [currentDeck]:updatedDeck};
  }

  let newCard;

  switch (action.type) {
    case 'updateStatsCorrect':
      newCard = {...card, 
        timesCorrect: card.timesCorrect + 1,
        dateLastCorrect: todayStr,
      }
      return updateMasterDeck(newCard);
    case 'updateStatsWrong':
      newCard = {...card, 
        timesWrong: card.timesWrong + 1,
        dateLastCorrect: todayStr,
      };
      return updateMasterDeck(newCard);
    case 'getCurrentCard':
      return card;
    default:
      throw new Error();
  }
}
