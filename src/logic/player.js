export default class Player extends Object {
    static counter = 0;

    constructor (info) {
        super();
        this.id = ++Player.counter;
        this.name = info[0];
        this.surname = info[1];
        this.history = [];
    }
    updateHistory (team) {
        this.history = this.history.concat(team.map(player => player.id));
    }
    clearHistory () {
        this.history = [];
    }
    get fitness () {
        let fitness = 0; // fitness will be square function - meeting the same player over and over again shoud be punished stronger and stronger 

        this.history.sort();

        let base = 0;
        let end = this.history.length - 1;
        for (let i = 0; i < end; i++) {
            if (this.history[i] == this.history[i + 1]) {
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