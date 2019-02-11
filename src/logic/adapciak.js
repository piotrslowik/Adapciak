import Event from './event.js';
import Player from './player.js';

export default class Adapciak extends Array {

    constructor (divisions, playersArray) {
        super();
        let numberOfEvents = divisions.length
        this.players = playersArray.map(el => new Player(el));
        for (let i = 0; i < numberOfEvents; i++) {
            this.push(new Event(divisions[i], this.players))
        }
    }

    get fitness () {
        let fitness = 0;
        this.players.forEach(player => fitness += player.fitness); 
        return fitness
    }

    mutate (eventsToMutate, playersToMutate) {
        for (let i = 0; i < eventsToMutate; i++) {
           let indexToMutate = Math.floor(Math.random() * this.length);
           this[indexToMutate].mutate(playersToMutate);
        }
    }

    updatePlayersHistory () {
        this.clearPlayersHistory();
        this.newPlayersHistory();
    }
    
    newPlayersHistory () {
        let numberOfEvents = this.length;   
        for (let i = 0; i < numberOfEvents; i++) {
            this[i].updatePlayersHistory();
        }
    }

    clearPlayersHistory () {
        this.players.forEach(player => player.clearHistory());
    }
}