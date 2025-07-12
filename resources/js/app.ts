import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./app.vue";

const app = createApp(App);

app.use(createPinia()); // <- pridaj Pinia
app.mount("#app");
