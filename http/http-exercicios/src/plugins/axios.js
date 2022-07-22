import Vue from 'vue'
import axios from 'axios'

//axios.defaults.baseURL = 'https://curso-vue-92d8d-default-rtdb.firebaseio.com/'

Vue.use({
    install(Vue) {
        //estará disponivel de forma global e isso aponta pro axios
        //Vue.prototype.$http = axios
        Vue.prototype.$http = axios.create({
            baseURL: 'https://curso-vue-92d8d-default-rtdb.firebaseio.com/'

        })
    }
})
