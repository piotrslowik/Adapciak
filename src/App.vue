<template>
  <div id="app">
    <Header text="Testing" />
    <PlayersInput v-if="waitingForCsv" @addedPlayers="playersWereAdded" />
    <EventsInput v-else @addedEvent="eventWasAdded" />
    <Divisions v-bind:data="divisions" @deletedEvent="eventWasDeleted" />
    <button class="start-button" @click="startApp">START</button>
    <button v-if="false" class="test-button" @click="doTest">TEST</button>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import PlayersInput from './components/PlayersInput.vue'
import EventsInput from './components/EventsInput.vue'
import Divisions from './components/Divisions.vue'

import App from './logic/app.js';

export default {
  name: 'App',
  components: {
    Header,
    PlayersInput,
    EventsInput,
    Divisions,
  },
  data: () => {
    return {
      players: [],
      divisions: [],
      waitingForCsv: true,
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
      this.waitingForCsv = false;
    },
    startApp: function () {
      const app = new App (this.divisions, this.players);
      app.evolve();
      
      // const adapciak = app.best;
      // adapciak.forEach( (event, index) => {
      //   console.log('Event numer ' + ++index);
      //   console.table(event);
      // });
      // console.log('Chujowość tego układu: ', adapciak.fitness);
    },
    doTest: function () {
      console.log('Test button działa!');
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
  border-size: 3px;
  background-image: linear-gradient(-45deg, #283a5e, blue);
}
</style>
