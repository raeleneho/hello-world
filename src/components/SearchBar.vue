<template>
<div>
  <!-- <font-awesome-icon :icon="['fas', 'search']" size="xs" /> -->
  <input class="input-container" type="text" 
  :placeholder="placeholder"
  :value="modelValue" 
  @input="$emit('update:modelValue', $event.target.value)"
  @keyup.enter="$emit('enter')">
</div>

</template>
<script>

export default ({
 name: "SearchBar",
 props: {


    modelValue: {
      type: String,
    },
   placeholder: {
     type: String
   }
}
})
</script>

<style scoped>
  .input-container {
    border: 1px solid #dadce0;
    font-size: 16px;
    padding: 20px 12px;
    width: 600px;
    border-radius: 12px;
    box-shadow: 2px 2px 2px 1px rgba(148, 64, 64, 0.1);
  }

  .input-container:focus {
    outline: none !important;
    /* border:1px solid; */
    box-shadow: 0 0 10px #719ECE;
}
  .search-icon {
    color:red;
    font-size: 20px;
  }
</style>
