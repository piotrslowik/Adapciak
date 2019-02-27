/* eslint-disable no-console */

import Team from './team.js';

export default class Event extends Array {

    constructor (numberOfTeams, playersArray) {
        super();
        const players = Event.shuffle(playersArray);
        let basePlayersNumber = Math.floor(players.length / numberOfTeams); // every teams has at least this many players
        let excessivePlayers = players.length % numberOfTeams; // how many players are left after base number
        let playersIterator = 0;

        for (let i = 0; i < numberOfTeams; i++) {
            this.push(new Team());
            
            for (let j = 0; j < basePlayersNumber; j++) {
                this[i].push(players[playersIterator]);
                playersIterator++;
            } 

            if (excessivePlayers > 0) {
                this[i].push(players[playersIterator]);
                excessivePlayers--;
                playersIterator++;
            }

            this[i].updatePlayersHistory();
        }
    }

    // mutate (PlayersToMutate) {
    //     for (let i = 0; i < PlayersToMutate; i++) {
    //         let teamToMutate1 = Math.floor(Math.random() * this.length);
    //         let teamToMutate2 = Math.floor(Math.random() * this.length);

    //         let playerToMutate1 = Math.floor(Math.random() * this[teamToMutate1].length);
    //         let playerToMutate2 = Math.floor(Math.random() * this[teamToMutate2].length);

    //         let player1 = this[teamToMutate1].slice(playerToMutate1, 1);
    //         let player2 = this[teamToMutate2].slice(playerToMutate2, 1);

    //         //console.log(`Zespół ${teamToMutate1} przed mutacją: `, this[teamToMutate1]);
    //         //console.log(`Gracz ${playerToMutate1} zespołu ${teamToMutate1} przed mutacją: `, this[teamToMutate1][playerToMutate1]);

    //         this[teamToMutate1].push(player2);
    //         this[teamToMutate2].push(player1);

    //         //console.log('team: ', teamToMutate1, ' gracz ', playerToMutate1, ' | team: ', teamToMutate2, ' gracz ', playerToMutate2);
    //         //console.log('Po mutacji: ', this);
    //     }
    // }

    mutate (PlayersToMutate) {
        for (let i = 0; i < PlayersToMutate; i++) {
            let teamToMutate1 = Math.floor(Math.random() * this.length);
            let teamToMutate2 = Math.floor(Math.random() * this.length);

            let playerToMutate1 = Math.floor(Math.random() * this[teamToMutate1].length);
            let playerToMutate2 = Math.floor(Math.random() * this[teamToMutate2].length);

            [this[teamToMutate1][playerToMutate1], this[teamToMutate2][playerToMutate2]] = [this[teamToMutate2][playerToMutate2], this[teamToMutate1][playerToMutate1]];
        }
    }

    updatePlayersHistory () {
        this.forEach(team => team.updatePlayersHistory());
    }

    static shuffle = (array) => {
        let currentIndex = array.length, randomIndex;
      
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
    
          [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    // static crossTwoEvents (event1, event2) {
    //     let numberOfTeams = event1.length;
    //     for (let i = 0; i < numberOfTeams; i+=2) {
    //         [event1[i], event2[i]] = [event2[i], event1[i]];
    //     }
    // }
}