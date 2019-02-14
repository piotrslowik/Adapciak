/* eslint-disable no-console */
import Adapciak from './adapciak.js';

export default class App {

    //  --- CONFIG ---

    popSize = 100;
    generationsLimit = 10;
    selectionSize = 5;
    mutationRate = 0.05;
    crossoverRate = 0.4;
    eventsToMutate = 2;
    playersToMutate = 2;

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
        console.log('Populacja w konstruktorze: ', this.population);
        console.log('Fitnessy w konstruktorze: ', this.costs);
        this.c = this.costs.map(el => el).sort();
    }

    evolve () {
        let generationIterator = 0;

        // console.log('Minimum: ', this.c[0]);
        // this.best = this.findBest();
        // console.log(`Generation #${generationIterator}'s best:`, this.best);

        while (generationIterator < this.generationsLimit && !this.stopCondition) {
            const selectedPopulation = this.newPopulationByTournament();
            const crossedPopulation = this.crossover(selectedPopulation);
            const mutatedPopulation = this.mutate(crossedPopulation);
            this.population = mutatedPopulation;
            this.updateCosts();
            this.best = this.findBest();
            this.stopCondition = this.best.fitness === 0;
            generationIterator++;
            console.log(`Generation #${generationIterator}'s best:`, this.best);
        }
    }

    newPopulationByTournament () {
        let newPopulation = [];
        let limit = this.popSize / 2;
        for (let i = 0; i < limit; i++) {
            newPopulation.push(this.selectByTournament());
        }
        return newPopulation;
    }

    selectByTournament () {
        let winnerIndex = Math.floor(Math.random() * this.popSize);
        let lowestCost = this.costs[winnerIndex];

        for (let i = 0; i < this.selectionSize; i++) {
            let newIndex = Math.floor(Math.random() * this.popSize);
            let newCost = this.costs[newIndex];
            if (newCost < lowestCost) {
                lowestCost = newCost;
                winnerIndex = newIndex;
            }
        }
        return this.population[winnerIndex];
    }

    crossover (population) {
        let newPopulation = [];
        let limit = population.length - 1;

        for (let i = 0; i < limit; i++) {
            if (Math.random() < this.crossoverRate) {
                const temp = Adapciak.crossTwoGetTwo(population[i], population[i + 1]);
                newPopulation.push(temp[0], temp[1]);
            }
            else newPopulation.push(population[i], population[i + 1]);
        }
        if (Math.random() < this.crossoverRate) {
            const temp = Adapciak.crossTwoGetTwo(population[population.length - 1], population[0]);
            newPopulation.push(temp[0], temp[1]);
        }
        else newPopulation.push(population[population.length - 2], population[0]);

        return newPopulation;
    }

    mutate (population) {
        const newPopulation = [];
        population.forEach(adapciak => {
            if (Math.random() < this.mutationRate) newPopulation.push(adapciak.mutate(this.eventsToMutate, this.playersToMutate));
            else newPopulation.push(adapciak);
        })
        return newPopulation;
    }

    updateCosts () {
        this.updateFitness(); 
        this.countCosts(); 
    }

    countCosts () {
        this.costs = this.population.map(adapciak => adapciak.fitness);
    }

    updateFitness () {
        this.population.forEach(adapciak => adapciak.updatePlayersHistory());
    }

    findBest () {
        let winnerIndex = 0;
        for (let i = 0; i < this.popSize; i++) {
            winnerIndex = this.costs[i] < this.costs[winnerIndex] ? i : winnerIndex;
        }
        // console.log('Indeks dla minimum: ', winnerIndex);
        // console.log('Fitnesy: ', this.costs);
        // console.log('Populacja: ', this.population);
        return this.population[winnerIndex];
    }
}