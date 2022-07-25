import Vue from 'vue'
import axios from 'axios'

//axios.defaults.baseURL = 'https://curso-vue-92d8d-default-rtdb.firebaseio.com/'
//axios.defaults.headers.common['Authorization'] = 'abc 123'
//axios.defaults.headers.common['Accepts'] = 'application/json'

Vue.use({
    install(Vue) {
        //estará disponivel de forma global e isso aponta pro axios
        //Vue.prototype.$http = axios
        Vue.prototype.$http = axios.create({
            baseURL: 'https://curso-vue-92d8d-default-rtdb.firebaseio.com/',
            headers: {
                get: {
                    'Authorization': 'abc 123'
                }
            }

        })
        Vue.prototype.$http.interceptors.request.use(config => {
            console.log(config.method)
            /*             if (config.method == 'post') {
                            config.method = 'put'
                        } */
            return config
        }, error => Promise.reject(error))
        Vue.prototype.$http.interceptors.response.use(res => {
            /*  const array = []
             for (let chave in res.data) {
                 array.push({ id: chave, ...res.data[chave] })
             }
             res.data = array */
            return res
        }, error => Promise.reject(error))
    }
})
