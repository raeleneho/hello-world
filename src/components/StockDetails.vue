
<template>

    <div class="stock-container">
  
      <h3>{{ stockProfile.longName }}</h3>
      <div class="top-section">

        
        <div class="stock-snapshot">

          <div class="price-container">
            <h2>{{ stockCurrency.currencySymbol }}{{ stockProfile.regularMarketPrice }}</h2> <p>{{ stockCurrency.currency }}</p>
          </div>
        
          <div class="price-percentage" :class="themeClass">
            <p>{{ dailyPriceDifferencePercentage }}</p>
          </div>
          
          <div class="price-difference" :style="styleClass">
            <span v-show="dailyPriceDifference > 0"> + </span>
            <span>{{ dailyPriceDifference }} Today</span>
          </div>
        </div>

        <Button class="follow-button" :button-label="buttonLabel" @click="showModal"
        ></Button>

        
        <Popup v-show="isModalVisible" @close="closeModal"
        @submit="addTab">
          <h4>Create Watchlist</h4>
        
          
          <BaseInput
            v-model="newWatchList" 
            class="input-style"
            type="text"
            @click="seeLog"
          /> 
        </Popup>

      </div>

    
    <DropDown
      class="dropdown"
      v-if="selectedStartDateIndex >= 0"
      v-model="selectedStartDateIndex"
      @update:model-value="changeWeekSelection(selectedStartDateIndex)"
    /> 

    <BarGraph 
    :bar-heights="barHeights" 
    :x-axis-labels="xAxisLabels"
    :y-axis-labels="yLabels"
    @mouseover="changeBorderColor($event)"
    @mouseleave="removeBorderColor" 
    @bar-select="changeCurrentDayIndex($event)" 
    />

    <div class="display-info">
      <p>{{ currentDate }}</p>
      <p>${{ currentDayPrice }}</p>
    </div>

  </div>


</template>

<script>

import Button from "./Button.vue";
import DropDown from "./DropDown.vue";
import { mapGetters, mapActions } from 'vuex';
import BarGraph from './BarGraph.vue';
import Popup from './Popup.vue'
import BaseInput from './BaseInput.vue';
export default {
  name: "StockDetails",
  data() {
      return {
        isGreater: false,
        hover: false,
        currentDayIndex: 0,
        selectedStartDateIndex: 0,
        dateRange: 5,
        buttonLabel: " + Follow",
        isModalVisible: false,
      };
    },
  components: {
    DropDown,
    BarGraph,
    Button,
    Popup,
    BaseInput,
  },

  computed: {

    newWatchList: {
      get() {
        return this.$store.state.newWatchList
      },
      set(value) {
        this.$store.commit('updateNewWatchList', value)
      }
    },
 
    styleClass(){
      return [this.dailyPriceDifference > 0 ? { 'color': 'green' } : { 'color': 'red' }]
    },
    themeClass(){
      return this.dailyPriceDifference > 0 ? 'green-theme' : 'red-theme';
    },

    yLabels() {
      const yLabels = []

      const numIntervals = 5
      const intervalSize = (this.priceDifference / (numIntervals - 1)).toPrecision(2)
      
      const startInterval = Math.floor(this.minPrice / intervalSize) * intervalSize

      const totalHeight = this.priceDifference / 0.8
      
      const realFloor = this.minPrice - (0.1 * totalHeight);
      const realCeiling = this.maxPrice + (0.1 * totalHeight);

      for (let index = 0; index < numIntervals; index++) {
        const intervalHeight = startInterval + (index * intervalSize);
        yLabels.push({
          label: `$${Math.round(intervalHeight)}`,
          positionFromBottom: `${((intervalHeight - realFloor) / (realCeiling - realFloor)) * 100}%`
        })
      }

      return yLabels
    },


    // dailyPriceDifference() {
    //   return (this.stockProfile.regularMarketPrice - this.stockProfile.previousClose).toFixed(2)
    // },

    // dailyPriceDifferencePercentage() {
    //   return (this.dailyPriceDifference / this.stockProfile.previousClose * 100).toFixed(2) + "%"
    // },

    weeklyPriceData() {
      return this.currentStockPrices
        .slice(this.selectedStartDateIndex, this.selectedEndDateIndex)
        .reverse();
    },

    weeklyDayLabel() {
      return this.chartLabels
        .slice(this.selectedStartDateIndex, this.selectedEndDateIndex)
        .reverse();
    },
    maxPrice() {
      return Math.max(...this.weeklyPriceData);
    },
    minPrice() {
      return Math.min(...this.weeklyPriceData);
    },
    priceDifference() {
      return this.maxPrice - this.minPrice;
    },

    barHeights() {
      return this.weeklyPriceData.map((price) => {
        return (
          String(
            0.8 * ((price - this.minPrice) / this.priceDifference) * 100 + 10
          ) + "%"
        );
      });
    },

    

    xAxisLabels(){
      return this.weeklyDayLabel.map((label)=> {
        return this.dateToReadableString(label)
      })
    },

    currentDayPrice() {
      const price = this.weeklyPriceData[this.currentDayIndex];
      return Number(price).toFixed(2);
    },

    currentDate() {
      return this.dateToReadableString(
        this.weeklyDayLabel[this.currentDayIndex]
      );
    },

    selectedEndDateIndex() {
      return this.selectedStartDateIndex + this.dateRange;
    },
     ...mapGetters([
      'currentStockPrices', 'chartLabels',
      'loaded',
      'stockProfile',
      'stockCurrency',
      'dailyPriceDifference',
      'dailyPriceDifferencePercentage'
    ])

  },

  methods: {

    // addTab(){
    //   this.$store.dispatch('addTab', this.newWatchList)
    // }
    // the same as 

    ...mapActions(['addTab']),

    showModal(){
      this.isModalVisible = true;
    },
    closeModal(){
      this.isModalVisible = false;
    },
    changeDisplayColor(){
      if (this.dailyPriceDifference > 0) {
        this.isGreater=!this.isGreater;
      }
    },

    changeBorderColor() {
      this.hover = !this.hover;
    },
    removeBorderColor(){
      this.hover = false;
    },
    changeCurrentDayIndex(newIndex) {
      this.currentDayIndex = newIndex;
    },

    changeWeekSelection(newIndex) {
      const indexNumber = Number(newIndex);
      this.selectedStartDateIndex = indexNumber * this.dateRange;
      console.log(this.selectedStartDateIndex)
    },

    dateToReadableString(unixTime) {
      const miliseconds = unixTime * 1000;
      const currentDate = new Date(miliseconds);
      const currentDayOfMonth = currentDate.getDate();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      return `${currentDayOfMonth}-${currentMonth + 1}-${currentYear}`;
    },
    
  },
 
};
</script>

<style scoped>

  .stock-container {
    border-radius: 12px;
    padding: 20px 50px;
    background-color: #fff;
    border: 1px solid #dadce0;
    box-shadow: 2px 2px 2px 1px rgba(148, 64, 64, 0.1);
  }

  /* .top-display {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: auto;
  } */
  .yaxis-label {
    font-size: 14px;
  }

  .stock-snapshot {
   flex-direction: row;
   display: flex;
   align-items: center;
  }

  .stock-snapshot > * {
    margin-right: 10px;
  }

  .price-container {
    display: flex;
    align-items: flex-end;
  }

  .price-container p {
    margin-left: 8px;
  }

  .green-theme {
    color: #137333;
    background: #e6f4ea;
    line-height: 1.5rem;
    padding: 0 8px;
    border-radius: 8px;
    width: min-content;
  }

   .red-theme {
    padding: 0 8px;
    border-radius: 8px;
    color: #a50e0e;
    background: #fce8e6;
    border-radius: 8px;
    width: min-content;
  }

  h3 {
    font-weight: lighter;
    color: rgba(0,0,0,0.87);
  }

  .stock-snapshot > span {
      font-size: 16px;
      font-weight: lighter;
  }
  
  .display-info {
    letter-spacing: .01785714em;
    font-size: .875rem;
    font-weight: 500;
    line-height: 1.25rem;
    border-radius: 8px;
    border: 1px solid #dadce0;
    height: 48px;
    min-width: 160px;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    padding: 6px 8px;
    justify-content: center;
    text-align: center;
    align-items: center;
    margin: 10px;
  }
  
  .dropdown {
    margin-top: 12px;
  }

  .top-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .follow-button {
    position: relative;
    display: block;
    padding: 0.3em 1.2em;
    letter-spacing: .01785714em;
    font-size: .875rem;
    font-weight: 500;
    font-family: poppins;
    border-radius:24px;
    box-sizing: border-box;
    text-align:center;
    /* z-index: 1; */
    right: 104px;
    width: auto;
    color: #1a73e8;
    background-color: #fff;
    box-shadow: none;
    border: 1px solid #1a73e8;
  }

  .follow-button:hover {
    color: #1967d2;
    background-color: #e8f0fe;
    box-shadow: 0 1px 3px rgb(60 64 67 / 15%), 0 1px 2px rgb(60 64 67 / 30%);
    border: 1px solid #e8f0fe;
    margin-bottom: 8px;
  }


  .input-style {
    border-radius: 12px;
  }
</style>



