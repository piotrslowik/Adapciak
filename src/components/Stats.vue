<template>
  <div class="Stats">
    <h2>{{ `Punkty karne obecnego podziału: ${fitness}` }}</h2>
    <h3>Statystyki powtórek</h3>
    <table>
        <tr v-for="(repeat, index) in repeats" v-bind:key="index">
            <td>{{index + 1}}</td>
            <td>{{repeat}}</td>
        </tr>
    </table>
  </div>
</template>

<script>
import getRepeatsStats from '../logic/stats.js';

export default {
    name: 'Stats',
    props: {
        adapciak: Object,
    },
    computed: {
        repeats: function () {
            return getRepeatsStats(this.adapciak);
        },
        fitness: function () {
            return this.adapciak.fitness;
        }
    },
}
</script>

<style scoped lang="scss">
.Stats {
    display: flex;
    flex-direction: column;
    align-items: center;
}
h2 {
  font-size: 30px;
  color: #283a5e;
}
h3 {
  font-size: 24px;
  color: #5e2828;
}
table {
    max-width: 200px;
    font-size: 22px;

    tr {
        td:nth-child(1) {
            text-align: right;
            width: 50%;
            padding-right: 15px;
            font-weight: bold;
        }
         td:nth-child(2) {
            text-align: left;
            width: 50%;
        }
    }
}
</style>
