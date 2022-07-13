import { createRouter, createWebHashHistory } from 'vue-router'
import Inicio from './components/inicio/Inicio.vue'
import Usuario from './components/usuario/Usuario.vue'
import Calculadora from './components/calculadora/Calculadora.vue'


const routes = [
    {
        path: '/',
        name: 'inicio',
        component: Inicio
    }, {
        path: '/usuario',
        name: 'usuario',
        component: Usuario
    }, {
        path: '/calculadora',
        name: 'calculadora',
        component: Calculadora
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
