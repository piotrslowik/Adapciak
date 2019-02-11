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
    //     this.performMutation(PlayersToMutate);
    //     //this.updatePlayersHistory();
    // }

    mutate (PlayersToMutate) {
        for (let i = 0; i < PlayersToMutate; i++) {
            //console.log('Event przed mutacją', this);
            let teamToMutate1 = Math.floor(Math.random() * this.length);
            let teamToMutate2 = Math.floor(Math.random() * this.length);

            let playerToMutate1 = Math.floor(Math.random() * this[teamToMutate1].length);
            let playerToMutate2 = Math.floor(Math.random() * this[teamToMutate2].length);

            //console.log('Zespół '+ teamToMutate1 + ' gracz ' + playerToMutate1 + ' Zespół '+ teamToMutate2 + ' gracz ' + playerToMutate2);

            //console.log(`Gracze przed zamianą: `, this[teamToMutate1][playerToMutate1], this[teamToMutate2][playerToMutate2]);

            [this[teamToMutate1][playerToMutate1], this[teamToMutate2][playerToMutate2]] = [this[teamToMutate2][playerToMutate2], this[teamToMutate1][playerToMutate1]];

            //console.log(`Gracze po zamianie: `, this[teamToMutate1][playerToMutate1], this[teamToMutate2][playerToMutate2]);

            //console.log('Event po mutacji', this);
        }
    }

    updatePlayersHistory () {
        let numberOfTeams = this.length;
        for (let i = 0; i < numberOfTeams; i++) {
            this[i].updatePlayersHistory();
        }
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
}