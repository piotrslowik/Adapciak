import Event from './event.js';
import Player from './player.js';

export default class Adapciak extends Array {

    constructor (divisions, playersArray) {
        super();
        let numberOfEvents = divisions.length
        const players = playersArray.map(el => new Player(el));
        for (let i = 0; i < numberOfEvents; i++) {
            this.push(new Event(divisions[i], players))
        }
    }

    get fitness () {
        return this[0].fitness;
    }

    mutate (eventsToMutate, playersToMutate) {
        for (let i = 0; i < eventsToMutate; i++) {
           let indexToMutate = Math.floor(Math.random() * this.length);
           this[indexToMutate].mutate(playersToMutate);
        }
    }
}