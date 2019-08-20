export default function reducer(state, action) {
  const { currentDeck, currentCardId } = action.payload;
  const card = ((state[currentDeck] || {})[currentCardId] || {});
  const today = new Date();

  function updateMasterDeck(newCard){
    const updatedDeck = {...state[currentDeck], [newCard.id]: newCard}
    console.log('---', newCard, today.toDateString())
    return {...state, [currentDeck]:updatedDeck};
  }

  let newCard;

  switch (action.type) {
    case 'updateStatsCorrect':
      newCard = {...card, timesCorrect: card.timesCorrect + 1}
      return updateMasterDeck(newCard);
    case 'updateDateLastCorrect':
      // TODO fix broken date
      newCard = {...card, dateLastCorrect: today.toDateString()};
      return updateMasterDeck(newCard);
    case 'updateStatsWrong':
      newCard = {...card, timesWrong: card.timesWrong + 1};
      return updateMasterDeck(newCard);
    case 'updateDateLastWrong':
      newCard = {...card, dateLastWrong: today};
      return updateMasterDeck(newCard);
    case 'getCurrentCard':
      return card;
    default:
      throw new Error();
      // return state;
  }
}
