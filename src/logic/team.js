export default class Team extends Array {
    updatePlayersHistory () {
        this.forEach((player, index) => {
            player.updateHistory(this.filter((playerInner, indexInner) => index !== indexInner))
        });
    }
}