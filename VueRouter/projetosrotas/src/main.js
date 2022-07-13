import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Panel from 'primevue/panel';

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'


const app = createApp(App);

app.use(PrimeVue);
app.use(router);

app.component('Dialog', Dialog);
app.component('Button', Button);
app.component('Card', Card);
app.component('Panel', Panel);


app.mount('#app')
