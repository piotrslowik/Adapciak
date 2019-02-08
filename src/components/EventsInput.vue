<template>
  <div class="EventsInput">
    <p>Na ile zespołów należy podzielić ludzi?</p>
    <input type="number" v-model.number="number" />
    <button v-on:click="addEvent">DODAJ</button>
  </div>
</template>

<script>
export default {
    name: 'EventsInput',
    // props: ['value'],
    data: () => {
        return {
            number: 1,
        }
    },
    methods: {
        addEvent: function () {
            this.$emit('addedEvent', this.number);
        }
    },
}
</script>

<style scoped>

.EventsInput {
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 800px;
    margin: auto;
}
p {
    margin: 0;
    font-size: 24px;
}
input {
    font-size: 26px;
    max-width: 50px;
    margin-left: 30px;
}
button {
    font-size: 20px;
    padding: 6px 10px;
    margin-left: 30px;
}
</style>
