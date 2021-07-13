import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/",
  headers: {
    "x-rapidapi-key": process.env.VUE_APP_API_KEY,
    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
  },
});

export default {
  install: (app) => {
    // Plugin code goes here
    app.config.globalProperties.axios = axiosInstance;
  }
}