<template>
    <div class="PlayersInput">
        <p>Wybierz plik .csv z listą graczy</p>
         <input class="file-input" type="file" v-on:change="addPlayers" accept=".csv">
    </div>
</template>

<script>
export default {
    name: 'PlayersInput',
    methods: {
        addPlayers: function (e) {
            const file = e.target.files[0];
            if (window.FileReader) {
                this.getAsText(file);
            } else {
                alert('Ta przeglądarka nie obsługuje odczytu plików.');
            }
        },
        getAsText: function(fileToRead) {
            const reader = new FileReader();
            reader.readAsText(fileToRead);
            reader.onload = this.loadHandler;
            reader.onerror = this.errorHandler;
        },
        loadHandler: function (event) {
            const csv = event.target.result;
            this.processData(csv);
        },
        processData: function (csv) {
            const allTextLines = csv.split(/\r\n|\n/);
            const lines = allTextLines.map(el => el.split(/,|:|;/))
            lines.pop(); // deleting empty line
            this.$emit('addedPlayers', lines);
        },
        errorHandler: function (e) {
            if(e.target.error.name == "NotReadableError") {
                alert("Nie można odczytać pliku.");
            }
        }
    },
}

</script>

<style scoped lang="scss">

.PlayersInput {
    font-size: 20px;
    max-width: 800px;
    margin: auto;
}
p {
    font-size: 24px;
}
input {
    font-size: 26px;
}
button {
    font-size: 20px;
    padding: 6px 10px;
    margin-left: 30px;
}
</style>
