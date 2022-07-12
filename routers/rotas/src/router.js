import Vue from 'vue'
import Router from 'vue-router'
import Inicio from './components/inicio/Inicio.vue'
import Usuario from './components/usuario/Usuario.vue'
import Calculadora from './components/calculadora/Calculadora.vue'

Vue.use(Router)

export default new Router({
    routes:[{
        path: '/',
        component: Inicio
    },{
        path: '/usuario',
        component: Usuario
    },
    ,{
        path: '/calculadora',
        component: Calculadora
    }]
})