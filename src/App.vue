<template>
  <div class="container">
    <Header title="Stock of the day" />
    <!-- <Input v-model="stockSearch" @search="fetchStocks(stockSearch)" /> -->
    <StockSearch />
    <StockDetails v-if="loaded"
    />
    <StockProfileCard v-if="loaded" />

    <TabCard />
    
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import StockSearch from "./components/StockSearch.vue";
import TabCard from "./components/TabCard.vue";
import StockDetails from "./components/StockDetails.vue";
import StockProfileCard from "./components/StockProfileCard.vue";

import { mapGetters, mapActions } from 'vuex';

export default {
  name: "App",
  components: {
    Header,
    StockDetails,
    StockSearch,
    StockProfileCard,
    TabCard,
  },
  data() {
    return {
      styles: {
        width: "650px",
        height: "400px",
        position: "relative",
      },
      initialTab: "Watchlist 1",
    };
  },
  computed: {
    ...mapGetters([
      'loaded'
    ])
  },
  methods: {
    ...mapActions(['fetchStocks']),
  },
};
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: Poppins, Arial, Helvetica, sans-serif;
  line-height: 1.4;
  
}

.container {
  margin: 28px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
