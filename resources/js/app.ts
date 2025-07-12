import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./app.vue";
import { useAuthStore } from "./stores/useAuthStore";
import router from "./router";

// 🔧 PrimeVue
import PrimeVue from "primevue/config";

// 🔧 PrimeVue CSS (overené funkčné v 3.46.0)
import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import "../css/app.css";

// 🔧 Axios (základné nastavenie)
import axios from "axios";
axios.defaults.baseURL = "http://localhost";

// 🔧 Spustenie aplikácie
const app = createApp(App);

app.use(PrimeVue);
app.use(router);
app.use(createPinia());

app.config.globalProperties.$axios = axios;
useAuthStore().init();

app.mount("#app");
