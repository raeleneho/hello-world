<template>
    <header>
      <h1>{{ title || "welcome" }}</h1>
    </header>
</template>

<script>

export default {
  props: {
    title: String
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* header {

  display: flex;
  justify-content: space-between;
  align-items: center;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
