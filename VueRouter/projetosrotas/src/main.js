import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import InputNumber from 'primevue/inputnumber';
import InputMask from 'primevue/inputmask';
import Calendar from 'primevue/calendar';
import Dropdown from 'primevue/dropdown';
import RadioButton from 'primevue/radiobutton';
import Listbox from 'primevue/listbox';
import Toast from "primevue/toast";
import ToastService from 'primevue/toastservice';
import Divider from 'primevue/divider';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import AutoComplete from 'primevue/autocomplete';
import Toolbar from 'primevue/toolbar';
import Rating from 'primevue/rating';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import Row from 'primevue/row';                     //optional for row
import FileUpload from 'primevue/fileupload';
import Image from 'primevue/image';

import 'primevue/resources/themes/saga-blue/theme.css'       //theme
import 'primevue/resources/primevue.min.css'                 //core css
import 'primeicons/primeicons.css'
import '/node_modules/primeflex/primeflex.css'


const app = createApp(App);

app.use(PrimeVue);
app.use(router);
app.use(ToastService);
app.use(ConfirmationService);

app.component('Dialog', Dialog);
app.component('Button', Button);
app.component('Card', Card);
app.component('Panel', Panel);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Textarea', Textarea);
app.component('InputNumber', InputNumber);
app.component('InputMask', InputMask);
app.component('Calendar', Calendar);
app.component('Dropdown', Dropdown);
app.component('RadioButton', RadioButton);
app.component('Listbox', Listbox);
app.component('Toast', Toast);
app.component('Divider', Divider);
app.component('ConfirmDialog', ConfirmDialog);
app.component('AutoComplete', AutoComplete);
app.component('Toolbar', Toolbar);
app.component('Rating', Rating);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('FileUpload', FileUpload);
app.component('Image', Image);


app.mount('#app')
