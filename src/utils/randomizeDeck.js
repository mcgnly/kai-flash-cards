export default function shuffle(deck){
    const indexStringArray = Object.keys(deck);
    // Fischer-Yates shuffle
    var i = indexStringArray.length,
        j = 0,
        temp;

    while (i--) { 
        // randomly choose an element between 0 and length
        j = Math.floor(Math.random() * (i+1));
        // swap randomly chosen element with current element
        temp = indexStringArray[i];
        indexStringArray[i] = indexStringArray[j];
        indexStringArray[j] = temp;
    }

    return indexStringArray;
}