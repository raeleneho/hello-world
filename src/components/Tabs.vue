<template>
  <div class="card-container">
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

      <button v-for="(tab, index) in tabs" :key="index" @click="$emit('tabSelect', index)">{{ tab.tabName }}
      </button>
     
     <div class="stats-row">
      <div class="stats-text" >
          AAPL
      </div>
      <div class="stats">
        $40000
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: ['currentTab'],
  // data () {
  //   return {
  //     // the index of the selected tab,
  //             // all of the tabs

  //     tabs: [
  //       {
  //         tabName: "New Tab 1",
  //         stocks: [], //<--- object of stock name, stock price, % price difference
  //       },
  //       {
  //         tabName: "New Tab 2",
  //         stocks: [], //<--- object of stock name, stock price, % price difference
  //       },
  //       {
  //         tabName: "New Tab 3",
  //         stocks: [], //<--- object of stock name, stock price, % price difference
  //       },
  //    ],
  //   }
  // },

  computed: {
    
  }
}

</script>

<style scoped>
.card-container {
  border-radius: 12px;
  border: 1px #dadce0 solid;
  margin: 16px 0;
  padding: 16px 16px 0 16px;
  box-sizing: border-box;
  width: 360px;
}

button {
  border: none;
  padding: 10px 10px;
  background-color: transparent;
  flex-direction: row;
  justify-content: center;
}

button:hover {
  background-color: #e8f0fe;
}

.selected-tab {
  background-color: #e8f0fe; 
}
.test-tab {
  background-color: red;
}
.stats-row {
  border-top: 1px solid #dadce0;
  padding: 8px 0;
  min-height: 43px;
  box-sizing: border-box;
  display: flex;
  box-pack: justify;
  justify-content: space-between;
  box-align: center;
  align-items: center
}

</style>