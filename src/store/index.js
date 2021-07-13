import { createStore } from 'vuex'
import { axiosInstance } from '@/plugins/axiosPlugin'

export default createStore({
  state: {
    currentStockPrices: null,
    chartLabels: null,
    loaded: false,
    stockCurrency: {},
    stockProfile: {},
    tabs: [
      {
        tabName: "",
        stocks: [], //<--- object of stock name, stock price, % price difference
      },
    ],
  },

  getters: {

    dailyPriceDifference(state) {
      return (
        state.stockProfile.regularMarketPrice - state.stockProfile.previousClose
      ).toFixed(2);
    },

    dailyPriceDifferencePercentage(state, getters) {
      return (
        (
          (getters.dailyPriceDifference / state.stockProfile.previousClose) *
          100
        ).toFixed(2) + "%"
      );
    },

    currentTabs(state) {
      return state.tabs;
    },
    currentStockPrices(state) {
      return state.currentStockPrices;
    },
    chartLabels(state) {
      return state.chartLabels;
    },

    loaded(state) {
      return state.loaded;
    },

    stockCurrency(state) {
      return state.stockCurrency;
    },
    stockProfile(state) {
      return state.stockProfile;
    },
  },
  mutations: {
    changeCurrentStockPrices(state, payload) {
      state.currentStockPrices = payload;
    },
    changeChartLabels(state, payload) {
      state.chartLabels = payload;
    },
    changeLoadedStatus(state) {
      state.loaded = true;
    },

    changeStockCurrency(state, payload) {
      state.stockCurrency = payload;
      console.log(state.stockCurrency);
    },
    changeStockProfile(state, payload) {
      state.stockProfile = payload;
      console.log(state.stockProfile);
    },

    addTab(state, tab) {
      state.tabs.push({ tab });
      console.log(state.tabs)
    },
  },
  actions: {
    async fetchStocks({ commit }, currentStockSearch) {
      try {
        const [priceData, profileData] = await Promise.all([
          axiosInstance.get(`stock/v3/get-historical-data`, {
            params: { symbol: currentStockSearch, region: "US" },
          }),
          axiosInstance.get(`stock/v2/get-profile`, {
            params: { symbol: currentStockSearch, region: "US" },
          }),
        ]);
        console.log(priceData);
        console.log(profileData);

        commit(
          "changeCurrentStockPrices",
          priceData.data.prices.map((price) => price.close)
        );
        commit(
          "changeChartLabels",
          priceData.data.prices.map((price) => price.date)
        );
        commit("changeLoadedStatus");

        commit("changeStockCurrency", {
          currency: profileData.data.price.currency,
          currencySymbol: profileData.data.price.currencySymbol,
        });
        // commit("changeStockLongName", profileData.data.price.longName);
        commit("changeStockProfile", {
          regularMarketPrice: profileData.data.price.regularMarketPrice.fmt,
          longName: profileData.data.price.longName,
          previousClose: profileData.data.summaryDetail.previousClose.fmt,
          marketCap: profileData.data.price.marketCap.fmt,
          volume: profileData.data.summaryDetail.volume.fmt,
          trailingPERatio: profileData.data.summaryDetail.trailingPE.fmt,
          divYield: profileData.data.summaryDetail.dividendYield.fmt,
          dayLow: profileData.data.summaryDetail.dayLow.fmt,
          dayHigh: profileData.data.summaryDetail.dayHigh.fmt,
          fiftyTwoWeekLow: profileData.data.summaryDetail.fiftyTwoWeekLow.fmt,
          fiftyTwoWeekHigh: profileData.data.summaryDetail.fiftyTwoWeekHigh.fmt,
          marketExchange: profileData.data.price.exchangeName,
        });
      } catch (err) {
        if (err.response) {
          console.log("Server Error:", err);
        } else if (err.request) {
          // client never received a response, or request never left
          console.log("Network Error:", err);
        } else {
          console.log("Client Error:", err);
        }
      }
    },
    addTab({ commit }, tab) {
      commit('ADD_TAB', tab)
    }
  },
});
