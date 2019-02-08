<template>
  <div class="header">
    <h1>{{ text }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    text: String,
  },
}
</script>

<style scoped>
h1 {
  font-size: 40px;
  color: #283a5e;
}
</style>
