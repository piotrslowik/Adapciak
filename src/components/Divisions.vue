<template>
  <div class="Divisions">
    <div class="item" v-for="el, index in data">
        <span class="item__delete" v-on:click="() => deleteEvent(index)">X</span>
        <span class="item__number"> {{ el }} </span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Divisions',
    props: ['data'],
    computed: {
        numbers: function () {
            return this.data
        }
    },
    methods: {
        deleteEvent: function (index) {
            this.$emit('deletedEvent', index);
        }
    },
}
</script>

<style scoped lang="scss">

.Divisions {
    font-size: 20px;
    display: flex;
    justify-content: center;
    max-width: 800px;
}

.item {
    display: flex;
    flex-direction: column;
    margin: 0 14px;

    &__delete {
        font-weight: 900;
        color: red;
        cursor: pointer;
    }

    &__number {
        font-size: 26px;
    }
}

</style>
