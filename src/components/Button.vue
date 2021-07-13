<template>
  <div>
    <button @click="$emit('click')">{{ buttonLabel }}</button>
  </div>
</template>

<script>
export default {
   props: {
    buttonLabel: {
      type: String,
      required: true
    },
    styleObject: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
  
   button {
     border: none;
      background-color: transparent;
   }
</style>