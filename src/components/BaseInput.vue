<template>
  <label>{{ label }}</label>
  <input 
  
  :placeholder="label" :value="modalValue" @input="$emit('update:modalValue', $event.target.value)"
  >

</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      modalValue: {
        type: [String, Number],
        default: ''
      },

      inputStyle: {
        type: String,
      }
    }
    
  }
</script>

<style scoped>

</style>