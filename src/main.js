import { createApp } from 'vue'
import App from './App.vue'
import axiosPlugin from '@/plugins/axiosPlugin'
import store from './store'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
// import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch);

const app = createApp(App)
  .use(store)
  .component("font-awesome-icon", FontAwesomeIcon);

// app.component("font-awesome-icon", FontAwesomeIcon);

app.use(axiosPlugin)
  .mount('#app');
