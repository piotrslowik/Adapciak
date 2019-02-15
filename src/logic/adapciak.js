import Event from './event.js';
import Player from './player.js';

const _ = require('lodash');

export default class Adapciak {

    constructor (divisions, playersArray) {
        let numberOfEvents = divisions.length
        this.players = playersArray.map(el => new Player(el));
        this.events = [];
        for (let i = 0; i < numberOfEvents; i++) {
            this.events.push(new Event(divisions[i], this.players))
        }
    }

    get fitness () {
        let fitness = 0;
        this.players.forEach(player => fitness += player.fitness); 
        return fitness
    }

    mutate (eventsToMutate, playersToMutate) {
        for (let i = 0; i < eventsToMutate; i++) {
           let indexToMutate = Math.floor(Math.random() * this.events.length);
           this.events[indexToMutate].mutate(playersToMutate);
        }
        return this;
    }

    static crossTwoGetTwo (adapciak1, adapciak2) {
        let numberOfEvents = adapciak1.events.length;
        let events1 = [];
        let events2 = []
        for (let i = 0; i < numberOfEvents; i++) {
            if (i % 2 === 0){
                events1.push(adapciak1.events.pop());
                events2.push(adapciak2.events.pop());
            } else {
                events1.push(adapciak1.events.pop());
                events2.push(adapciak2.events.pop());
            }
        }
        [adapciak1.events, adapciak2.events] = [events2.reverse(), events1.reverse()];
        return [adapciak1, adapciak2];
    }

    updatePlayersHistory () {
        this.clearPlayersHistory();
        this.newPlayersHistory();
    }

    newPlayersHistory () {
        this.events.forEach(event => event.updatePlayersHistory());
    }

    clearPlayersHistory () {
        this.players.forEach(player => player.clearHistory());
    }
}