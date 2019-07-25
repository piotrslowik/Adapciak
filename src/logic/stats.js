const getRepeatsStats = adapciak => {
    const {players, events} = adapciak;
    const repeatsArr = createRepeatsArray(events);
    players.forEach(player => {
        let base = 0;
        let end = player.history.length - 1;
        for (let i = 0; i < end; i++) {
            if (player.history[i] == player.history[i + 1]) {
                base++;
            }
            else {
                repeatsArr[base]++;
                base = 0;
            }
        }
    });
    return repeatsArr;
}

const createRepeatsArray = events => {
    const output = [];
    for (let i = 0; i < events.length; i++) {
        output.push(0);
    }
    return output;
}

export default getRepeatsStats
