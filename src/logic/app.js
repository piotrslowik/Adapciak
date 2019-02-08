/* eslint-disable no-console */
import Adapciak from './adapciak.js';

export default class App {

    //  --- CONFIG ---

    popSize = 50;
    generationsLimit = 1;
    selectionSize = 3;
    mutationRate = 0.05;
    crossoverRate = 0.4;
    eventsToMutate = 2;
    playersToMutate = 3;

    //  --------------

    population = [];
    costs = [];
    stopCondition = false;
    best = {};

    constructor (divisions, players) {
        for (let i = 0; i < this.popSize; i++) {
            this.population.push(new Adapciak (divisions, players))
        }
        this.costs = this.population.map(adapciak => adapciak.fitness);
        console.log(this.findBest());
    }

    evolve () {
        let generationIterator = 0;
        while (generationIterator < this.generationsLimit && !this.stopCondition) {
            let newPopulation = this.newPopulationByTournament();
            //this.crossover(newPopulation);
            this.mutate(newPopulation);
            this.population = newPopulation;
            this.costs = this.population.map(adapciak => adapciak.fitness);
            this.stopCondition = this.costs.some(cost => cost === 0);
            this.best = this.findBest();
            generationIterator++;
            console.log(`Generation #${generationIterator}'s best:`, this.findBest());
        }
    }

    newPopulationByTournament () {
        let newPopulation = [];
        for (let i = 0; i < this.popSize; i++) {
            newPopulation.push(this.selectByTournament());
        }
        return newPopulation;
    }

    selectByTournament () {
        let winnerIndex = Math.floor(Math.random() * this.popSize);
        let lowestCost = this.costs[winnerIndex];

        for (let i = 0; i < this.selectionSize; i++)
        {
            let newIndex = Math.floor(Math.random() * this.popSize);
            let newCost = this.costs[newIndex];
            if (newCost < lowestCost)
            {
                lowestCost = newCost;
                winnerIndex = newIndex;
            }
        }
        return this.population[winnerIndex];
    }

    // crossover (population) {

    // }

    mutate (population) {
        population.forEach(adapciak => {
            if (Math.random() < this.mutationRate) adapciak.mutate(this.eventsToMutate, this.playersToMutate)
        })
    }

    findBest () {
        let winnerIndex = 0;
        for (let i = 0; i < this.popSize; i++) {
            winnerIndex = this.costs[i] < this.costs[winnerIndex] ? i : winnerIndex;
        }
        return this.population[winnerIndex];
    }
}