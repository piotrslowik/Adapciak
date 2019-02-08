export default class Team extends Array {
    updatePlayersHistory () {
        this.forEach((player, index) => {
            player.updateHistory(this.filter((playerInner, indexInner) => index !== indexInner))
        });
    }
    get fitness () {
        let fitness = 0;
        this.forEach(player => fitness += player.fitness)
        return fitness;
    }
}