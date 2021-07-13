

<template>
 <div 
 class="card-container">
    <h4>Key Stats</h4>
    <div class="stats-row">
      <div class="stats-text" >
          PREVIOUS CLOSE
      </div>
      <div class="stats">
        {{ stockCurrency.currencySymbol }}{{ stockProfile.previousClose }}
      </div>
    </div>

    <div class="stats-row">
      <div class="stats-text">
          DAY RANGE
      </div>
      <div class="stats">
        {{ stockCurrency.currencySymbol }}{{ stockProfile.dayLow }} - {{ stockCurrency.currencySymbol }}{{ stockProfile.dayHigh }}
      </div>
    </div>


    <div class="stats-row">
      <div class="stats-text">
          YEAR RANGE
      </div>
      <div class="stats">
        {{ stockCurrency.currencySymbol }}{{ stockProfile.fiftyTwoWeekLow }} - {{ stockCurrency.currencySymbol }}{{ stockProfile.fiftyTwoWeekHigh }}
      </div>
    </div>

     <div class="stats-row">
      <div class="stats-text">
          MARKET CAP
      </div>
      <div class="stats">
        {{ stockProfile.marketCap }} {{ stockCurrency.currency }}
      </div>
    </div>

    <div class="stats-row">
      <div class="stats-text">
          VOLUME
      </div>
      <div class="stats">
        {{ stockProfile.volume }}
      </div>
    </div>

     <div class="stats-row">
      <div class="stats-text">
          P/E Ratio
      </div>
      <div class="stats">
        {{ stockProfile.trailingPERatio }}
      </div>
    </div>

     <div class="stats-row">
      <div class="stats-text">
          DIVIDEND YIELD
      </div>
      <div class="stats">
        {{ stockProfile.divYield }}
      </div>
    </div>

    <div class="stats-row">
      <div class="stats-text">
          PRIMARY EXCHANGE
      </div>
      <div class="stats">
        {{ stockProfile.marketExchange }}
      </div>
    </div>
 </div>
</template>
  

<script>
import { mapGetters } from 'vuex'

export default {
  name: "StockProfileCard",
  computed: {
     ...mapGetters([
      'loaded',
      'stockProfile',
      'stockCurrency'
    ]),

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

  h2 {
    margin-bottom: 12px;
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
  .stats-text {
    border-bottom: 1px dashed #5f6368;
    padding-bottom: 1px;
    cursor: pointer;
    letter-spacing: .07272727em;
    font-family: Roboto,Arial,sans-serif;
    font-size: .6875rem;
    font-weight: 500;
    text-transform: uppercase;
    color: #5f6368;
    line-height: .6875rem;
  }

  .stats {
    letter-spacing: .01785714em;
    font-family: 'Google Sans',Roboto,Arial,sans-serif;
    font-size: .875rem;
    font-weight: 500;
    line-height: 1.25rem;
    color: #202124;
    text-overflow: ellipsis;
    text-align: right;
    overflow: hidden;
    display: flex;
    -webkit-box-align: center;
    box-align: center;
    align-items: center;

  }
</style>