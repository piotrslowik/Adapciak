import Event from './event.js';
import Player from './player.js';

const _ = require('lodash');

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
        return this;
    }

    static crossTwoGetTwo (adapciak1, adapciak2) {
        console.log('Adapciaki przed krzyżowaniem: ', adapciak1, adapciak2);
        let numberOfEvents = adapciak1.length;
        for (let i = 0; i < numberOfEvents; i+=2) {
            [adapciak1[i], adapciak2[i]] = [adapciak2[i], adapciak1[i]];
        }
        console.log('Adapciaki po krzyżowaniu: ', adapciak1, adapciak2);
        return [adapciak1, adapciak2];
    }

    updatePlayersHistory () {
        this.clearPlayersHistory();
        this.newPlayersHistory();
    }

    newPlayersHistory () {
        this.forEach(event => event.updatePlayersHistory());
    }

    clearPlayersHistory () {
        this.players.forEach(player => player.clearHistory());
    }
}