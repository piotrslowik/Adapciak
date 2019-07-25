<template>
  <div id="app">
    <Header text="AdapciakoDzielnik" />
    <PlayersInput v-if="!players.length" @addedPlayers="playersWereAdded" />
    <EventsInput v-else @addedEvent="eventWasAdded" />
    <Divisions v-bind:data="divisions" @deletedEvent="eventWasDeleted" />
    <button v-if="false" class="start-button" @click="startApp">START</button>
    <button v-if="players.length" class="start-button" @click="doTest">THINK</button>
    <button v-if="adapciak.events" class="print-button" @click="print">PRINT</button>
    <Stats v-if="adapciak.events" v-bind:adapciak="this.adapciak" />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import PlayersInput from './components/PlayersInput.vue'
import EventsInput from './components/EventsInput.vue'
import Divisions from './components/Divisions.vue'
import Stats from './components/Stats.vue'

import App from './logic/app.js';
import printDivisions from './logic/printer.js';
import getRepeatsStats from './logic/stats.js';


export default {
  name: 'App',
  components: {
    Header,
    PlayersInput,
    EventsInput,
    Divisions,
    Stats,
  },
  data: () => {
    return {
      players: [],
      divisions: [8, 7, 7, 6, 6],
      adapciak: [],
      app: null,
    }
  },
  methods: {
    eventWasAdded: function (val) {
      this.divisions.push(val);
    },
    eventWasDeleted: function (val) {
      this.divisions = this.divisions.filter((el, index) => index != val);
    },
    playersWereAdded: function (data) {
      this.players = data;
      console.log('Wczytani gracze: ');
      console.table(this.players);
    },
    startApp: function () {
      if (!this.app) this.app = new App (this.divisions, this.players);
      app.evolve();
      
      // const adapciak = app.best;
      // adapciak.forEach( (event, index) => {
      //   console.log('Event numer ' + ++index);
      //   console.table(event);
      // });
      // console.log('Chujowość tego układu: ', adapciak.fitness);
    },
    doTest: async function () {
      if (!this.app) this.app = new App(this.divisions, this.players);
      this.adapciak = await this.app.generateRandomly(this.divisions, this.players);
    },
    print: function () {
      printDivisions(this.adapciak);
    }
  }
}

</script>

<style lang="scss">
html {
    background: #fff0ca;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
}
.Divisions {
  margin: 30px auto;
}
.start-button {
  font-size: 25px;
  font-weight: bold;
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  border-color: white;
  border-width: 2px;
  background-image: linear-gradient(-45deg, #283a5e, blue);
  margin-right: 20px;
  min-width: 112px;
}
.print-button {
  font-size: 25px;
  font-weight: bold;
  color: white;
  padding: 10px 16px;
  border-radius: 10px;
  border-color: white;
  border-width: 2px;
  background-image: linear-gradient(-45deg, rgb(94, 69, 40), rgb(134, 110, 29));
  min-width: 112px;
}
</style>
