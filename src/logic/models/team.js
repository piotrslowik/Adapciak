export default class Team extends Array {
    updatePlayersHistory () {
        //console.log('Update: ', this);
        this.forEach((player, index) => {
            player.updateHistory(this.filter((playerInner, indexInner) => index !== indexInner))
        });
    }
}