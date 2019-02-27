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
        const mutated = this.events.map(event => event);
        for (let i = 0; i < eventsToMutate; i++) {
           let indexToMutate = Math.floor(Math.random() * mutated.length);
           mutated[indexToMutate].mutate(playersToMutate);
        }
        this.events = mutated;
    }

    static crossTwoGetTwo (adapciak1, adapciak2) {
        console.log('Przed krosem:', adapciak1, adapciak2);
        const numberOfEvents = adapciak1.events.length;
        const events1 = [];
        const events2 = [];
        const newAdapciak1 = Object.assign(adapciak1);
        const newAdapciak2 = Object.assign(adapciak2);
        for (let i = 0; i < numberOfEvents; i++) {
            if (i % 2 === 0){
                events1.push(newAdapciak1.events.pop());
                events2.push(newAdapciak2.events.pop());
            } else {
                events2.push(newAdapciak1.events.pop());
                events1.push(newAdapciak2.events.pop());
            }
        }
        [newAdapciak1.events, newAdapciak2.events] = [events1.reverse(), events2.reverse()];
        console.log('Po krosie:', newAdapciak1, newAdapciak2);
        return [newAdapciak1, newAdapciak2];
    }

    // static crossTwoGetTwo (adapciak1, adapciak2) {
    //     let numberOfEvents = adapciak1.events.length;
    //     for (let i = 0; i < numberOfEvents; i+=2) {
    //         [adapciak1.events, adapciak2.events] = [adapciak2.events, adapciak1.events];
    //     }
    //     return [adapciak1, adapciak2];
    // }

    updatePlayersHistory () {
        this.clearPlayersHistory();
        this.newPlayersHistory();
    }
    
    clearPlayersHistory () {
        this.players.forEach(player => player.clearHistory());
    }

    newPlayersHistory () {
        this.events.forEach(event => event.updatePlayersHistory());
    }
    
    updatePlayersList () {
        const players = [];
        this.events[0].forEach(team => team.forEach(player => players.push(player)));
        this.players = players;
    }
}