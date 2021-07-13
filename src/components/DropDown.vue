<template>

  <div class="dropdown">
    <p>Select a week</p>
    <select @input="$emit('update:modelValue', $event.target.value)">
       <option disabled value="">Please select one</option>
      <option :value=0>This Week</option>
      <option :value=1>Last Week</option>
      <option :value=2>Third Week</option>
      <option :value=3>Fourth Week</option>
    </select>
  </div>

</template>

<script>
export default {
  name: "DropDown",
}
</script>

<style scoped>
/* Dropdown button */
  .dropdown {
    margin-bottom: 10px;
  }
</style>