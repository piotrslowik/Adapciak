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

    get fitness () {
        let fitness = 0;
        this.forEach(team => fitness += team.fitness)
        return fitness;
   } 

    mutate (PlayersToMutate) {
        console.log('Event przed mutacją: ', this);
        for (let i = 0; i < PlayersToMutate; i++) {
            let teamToMutate1 = Math.floor(Math.random() * this.length);
            let teamToMutate2 = Math.floor(Math.random() * this.length);

            let playerToMutate1 = Math.floor(Math.random() * this[teamToMutate1].length);
            let playerToMutate2 = Math.floor(Math.random() * this[teamToMutate2].length);
            console.log(`Mutuję graczy zespołu ${teamToMutate1}: `, playerToMutate1);
            console.log(`Mutuję graczy zespołu ${teamToMutate2}: `, playerToMutate2);

            let temp = this[teamToMutate1][playerToMutate1];
            console.log(`Gracze przed zamianą: `, this[teamToMutate1][playerToMutate1], this[teamToMutate2][playerToMutate2]);
            this[teamToMutate1][playerToMutate1] = []//this[teamToMutate2][playerToMutate2];
            this[teamToMutate2][playerToMutate2] = []//temp;
            console.log(`Gracze po zamianie: `, this[teamToMutate1][playerToMutate1], this[teamToMutate2][playerToMutate2]);
        }
        console.log('Event po mutacji: ', this);
    }

    static shuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;
      
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
    
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
      
        return array;
      }
}