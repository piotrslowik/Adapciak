export default class Player extends Object {
    static counter = 0;

    constructor (info) {
        super();
        this.id = ++Player.counter;
        this.name = info[0];
        this.surname = info[1];
        this.history = [];
    }
    static updateHistory (player, team) {
        player.history = player.history.concat(team.map(mate => mate.id));
    }
    static clearHistory (player) {
        player.history = [];
    }
    static fitness = (player) => {
        let fitness = 0; // fitness will be square function - meeting the same player over and over again shoud be punished stronger and stronger 

        player.history.sort();

        let base = 0;
        let end = player.history.length - 1;
        for (let i = 0; i < end; i++) {
            if (player.history[i] == player.history[i + 1]) {
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