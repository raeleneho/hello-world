<template>
  <label v-if="label">{{ label }}</label>
  <input 
  
  :placeholder="label" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
  >

</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: ''
      },
      modelValue: {
        type: [String, Number],
      },

      inputStyle: {
        type: String,
      }
    }
    
  }
</script>

<style scoped>

</style>