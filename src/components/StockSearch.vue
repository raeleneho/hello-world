<template>
  <div class="input-container">

    <SearchBar v-model="currentStockSearch" :placeholder="placeholder" @enter="fetchStocks(currentStockSearch); eraseSearchTerm()"/>

    <!-- <button class="btn-primary" @click="$emit('search')">Search</button> -->
    <Button class="search-button" :button-label="buttonLabel" @click="fetchStocks(currentStockSearch); eraseSearchTerm()"/>
    <div></div>
  </div>

</template>
<script>

import SearchBar from './SearchBar.vue'
import { mapActions } from 'vuex';
import Button from './Button.vue'
export default ({
 name: "StockSearch",
//  props: {
//    modelValue: {
//      type: String,
//    },
//  },
  data(){
    return {
      currentStockSearch:"",
      placeholder:"Search stocks, ETFs & more",
      buttonLabel: "Search",
      styleObject: {
        backgroundColor: 'red'
      }
    }
  },
 components: {
   SearchBar,
   Button
 },
 methods: {
   ...mapActions([
      'fetchStocks', 
    ]),

    eraseSearchTerm(){
      this.currentStockSearch="";
    }
 }
})
</script>

<style scoped>
  * {
    margin: 6px;
  }
  .input-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: none;
    }


  .search-button {
    position: relative;
    display: inline-block;
    padding: 0.3em 1.2em;
    font-family: poppins;
    border-radius:2em;
    box-sizing: border-box;
    background-color:#aee2bf;
    text-align:center;
    z-index: 1;
    right: 104px;
  }

  .search-button:hover {
    background-color: cornflowerblue;
  }
</style>
