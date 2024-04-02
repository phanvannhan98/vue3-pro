import 'sanitize.css';
import '@/styles/index.scss';

import { createApp } from 'vue';
import Toast from 'vue-toastification';

import App from '@/App.vue';
import { setupGlobDirectives } from '@/directives';
import { i18n } from '@/i18n';
import { router } from '@/router';
import { store } from '@/store';
import { vuetify } from '@/vuetify';
// import '@/router/permission';

const app = createApp(App);

app.use(store).use(router).use(i18n).use(Toast).use(vuetify);

setupGlobDirectives(app);

app.mount('#app');
