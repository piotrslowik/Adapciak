import Player from './player.js';

export default class Team extends Array {
    static updatePlayersHistory (team) {
        //console.log('Update: ', this);
        team.forEach((player, index) => {
            Player.updateHistory(player, team.filter((playerInner, indexInner) => index !== indexInner))
        });
    }
}