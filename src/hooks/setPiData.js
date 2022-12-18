function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

function setPiData(data, callback, category) {
    var neutral_prob=getRndInteger(60,100);
    callback([
        { name: 'Probability of '+category, value: neutral_prob },
        { name: 'Probability of not '+category, value: 100-neutral_prob }
    ]);
    console.log(getRndInteger(60,100));
}

export default setPiData;