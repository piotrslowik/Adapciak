export default class Player extends Array {
    static counter = 0;

    constructor (info) {
        super();
        this.id = ++Player.counter;
        this.name = info[0];
        this.surname = info[1];
        this.history = [];
    }
    updateHistory (team) {
        this.history = this.history.concat(team);
    }
    get fitness () {
        let fitness = 0; // fitness will be square function - meeting the same player over and over againt shoud be punished stronger and stronger 
        const historyIndexes = this.history.map(el => el.id);

        historyIndexes.sort();

        let base = 0;
        let end = historyIndexes.length - 1;
        for (let i = 0; i < end; i++) {
            if (historyIndexes[i] == historyIndexes[i + 1]) {
                base++;
            }
            else {
                fitness += Math.pow(base, 2);
                base = 0;
            }
        }
        return fitness;
    }
}