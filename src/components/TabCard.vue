<template>
  <div>
    <!-- <ul class='tabs-header'>
      <li v-for='tab in tabs' :key='tab.title'>
        {{ tab.title }} 
      </li>
    </ul>
    <slot></slot> -->
    <!-- <div class="card">
      <div id="card-header">
        <slot name="header"></slot>
      </div>
      <div id="card-content">
        <slot></slot>
      </div>
    </div>   -->
    <ul>


      <li v-for="tab in tabs" :key="tab.tabName"></li>
        <!-- <slot :tabName="tab.tabName"></slot> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: "TabCard",
  // props: ['content'],
  data () {
    return {
      selectedIndex: 0, // the index of the selected tab,
              // all of the tabs
    }
  },
  // created () {
  //   this.tabs = this.$children
  // }
}
</script>

<style scoped>
.card {
  padding: 16px;
  margin-bottom: 20px;
  width: 200px;
}


</style>