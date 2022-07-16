import Vue from 'vue'
import Router from 'vue-router'
import Inicio from './components/inicio/Inicio.vue'
//import Usuario from './components/usuario/Usuario.vue'
//import UsuarioLista from './components/usuario/UsuarioLista.vue'
//import UsuarioDetalhe from './components/usuario/UsuarioDetalhe.vue'
//import UsuarioEditar from './components/usuario/UsuarioEditar.vue'
import Menu from '@/components/template/Menu.vue'
import MenuAlt from '@/components/template/MenuAlt.vue'

Vue.use(Router)
const Usuario = () => import(/* webpackChunckName: "usuario" */'./components/usuario/Usuario.vue')
const UsuarioLista = () => import(/* webpackChunckName: "usuario" */'./components/usuario/UsuarioLista.vue')
const UsuarioDetalhe = () => import('./components/usuario/UsuarioDetalhe.vue')
const UsuarioEditar = () => import('./components/usuario/UsuarioEditar.vue')

const router = new Router({
    mode: 'history',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else if (to.hash) {
            return { selector: to.hash }
        }
        return { x: 0, y: 0 }
    },
    routes: [{
        name: 'inicio',
        path: '/',
        //component: Inicio
        components: {
            default: Inicio,
            menu: Menu
        }
    }, {
        path: '/usuario',
        //component: Usuario,
        components: {
            default: Usuario,
            menu: MenuAlt
        },
        props: true,
        children: [
            { path: '', component: UsuarioLista },
            {
                path: ':id', component: UsuarioDetalhe, props: true,
                beforeEnter: (to, from, next) => {
                    console.log('antes da rota -> usuário detalhe')
                    next()
                }
            },
            { path: ':id/editar', component: UsuarioEditar, props: true, name: 'editarUsuario' },
        ]
    }, {
        path: '/redirecionar',
        redirect: '/usuario'
    }, {
        path: '*',
        redirect: '/'
    }]
})

router.beforeEach((to, from, next) => {
    console.log('antes das rotas -> global')
    /*     if (to.path !== '/usuario') {
            next('/usuario')
        } else {
            next()
        } */
    next()
    //pode passar um objeto pra next

})
//senão chamar o next significa que vai interromper a navegação

export default router