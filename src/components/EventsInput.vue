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
    font-size: 26px;
}
input {
    font-size: 30px;
    max-width: 50px;
    margin-left: 30px;
    padding: 3px;
}
button {
    text-shadow: 1px 1px 4px black;
    color: white;
    font-weight: 900;
    font-size: 20px;
    padding: 8px 14px;
    margin-left: 30px;
    border-radius: 10px;
    background-image: linear-gradient(-45deg, #a3aace, lightgray);
}
</style>
